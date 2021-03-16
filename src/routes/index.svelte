<script>
	import { onMount } from 'svelte'

	let makerjs
	let maker

	onMount(async () => {

		makerjs = await import('makerjs')


		maker = {
			rectangle: makerjs.models.Rectangle,
			svg: makerjs.exporter.toSVG,
			subtract: makerjs.model.combineSubtraction,
			union: makerjs.model.combineUnion,
			move: makerjs.model.move,
			combine: makerjs.model.combine,
		}

	});


	function ui( value, name, unit, min, max, step  ) {
		return {
			value,
			name,
			min,
			max,
			step,
			unit
		}
	}
	const MM = 'mm'
	const NUM = 'num'
	const DEG = 'deg'
	const TARGET = 'target'

	const targets = {
		top: 'top',
		left: 'left',
		front: 'front',
		back: 'back',
		right: 'right',
		bottom: 'bottom'
	}


	let conf = {
		width: ui( 120, 'box width', MM),
		height: ui( 120, 'box height', MM),
		depth: ui( 120, 'box depth', MM),
		thickness: ui( 15, 'material thickness', MM, 0, 20),
		tabs: ui( 5, 'side tabs count', NUM),
		offset: ui( 0.5, 'side tabs offset', NUM, 0, 1, 0.1),
		overhang: ui( 5, 'panel overhang', MM, 2),
		slot: ui( 0, 'panel slots', NUM ),
		size: ui( 10, 'panel slot size', MM )
	}

	const HOLES = {
		diameter: ui( 5, 'hole diameter', MM ),
		offset: ui( 20, 'hole offset', MM, 0),
		count: ui( 4, 'hole amount', NUM, 1 ),
		rotate: ui( 0, 'rotation', DEG )
	}

	let els = [

	]



	function svg( conf ) {

		function path( m ) {

			const chain = makerjs.model.findSingleChain( m )
			return makerjs.exporter.chainToSVGPathData( chain )
		}

		function clean( m, x, y ) {

			const p = path( m )

			return {
				models: {
					rect: maker.move( 
						makerjs.importer.fromSVGPathData(p),
						[x,y]
					)
				}
			}
		}

		let sides = { }
		if (!makerjs) return

		let ss = ['left', 'front', 'right', 'back']

		const t = conf.thickness.value
		const d = conf.depth.value
		const tabs = conf.tabs.value
		const size = conf.size.value
		const slot = conf.slot.value
		const offset = parseFloat( conf.offset.value ) || 0
		const overhang = conf.overhang.value

		let w = conf.width.value
		const h = conf.height.value
		let x = 0
		const y = h
		const middle = h + (overhang * 2) + (t * 2)

		let faces = {}

		const ff = ['top', 'bottom']
		ff.forEach( (f, i) => {
			let xx = h + t
			const mod = i%2 == 0
			const oo = overhang * 2
			const ww = w + oo
			const hh = h + oo
			let face = {
				models: {
					rect: new maker.rectangle(ww,hh) 
				},
				origin: [xx - overhang, mod ? 0 : middle + d + (t * 2)]
			}

			let rot = i%2 == 0

			
			const www = size + t
			let corner = {
				models: {

					a: maker.move( 
						new maker.rectangle( www, t ),
						[overhang, overhang]
					),
					b: maker.move( 
						new maker.rectangle( t, www ),
						[overhang, overhang]
					)
				}
			}
			maker.combine( corner.models.a, corner.models.b )

			let four = [
				{
					name: 'bl',
					rot: 0,
					xy: [0,0]
				},
				{
					name: 'br',
					rot: 90,
					xy: [ww,0]
				},
				{
					name: 'tr',
					rot: 180,
					xy: [ww,hh]
				},
				{
					name: 'tl',
					rot: 270,
					xy: [0,hh]
				}
			]

			four.forEach( u => {
				const c = JSON.parse( JSON.stringify( corner ) )

				maker.move( c, u.xy )
				makerjs.model.rotate( c, u.rot, u.xy )
				face.models[u.name] = c

			})


			faces[f] = face

		})

		w = conf.width.value + t

		ss.forEach( (s, i) => {

			const ww = (i%2 == 0) ? h : w

			let m = {
				models: {
					rect: new maker.rectangle(ww, d)
				},
				origin: [x, y]
			}

			const seg = d / (tabs / 2 )
			for (let i = 0; i < ( tabs / 2 ) ; i++ ) {
				const x = m.origin[0]
				const y = seg * i
				const hh = seg / 2

				const aa = [-1, ww - t]

				let either = [
					{
						x: -1,
						y: y - (hh * offset),
						w: t + 1,
						h: hh
					},
					{
						x: ww - t,
						y: y - (hh * offset) + hh,
						w: t + 1,
						h: hh
					}
				]

				either.forEach( (cc,ii) => {

					const b = parseInt( cc.y + cc.h ) == parseInt( d )
					if (b) cc.h += 10

					const r = maker.move(
						new maker.rectangle( cc.w, cc.h),
						[cc.x,cc.y]
					)

					const k = 'bit' + i + '-' + ii
					m.models[ k ] = r
					maker.subtract( m.models.rect, m.models[ k ] )
				})



			}


			let flip = tabs%2 != 0

			let slots = [
				{
					x: x,
					y: -t,
					w: size,
					h: t + 1
				},
				{
					x: x + ww - (t * 2),
					y: -t,
					w: size,
					h: t + 1
				},
				{
					x: x,
					y: d - 1,
					w: size,
					h: t + 1
				},
				{
					x: x + ww - (t * 2),
					y: d - 1,
					w: size,
					h: t + 1
				}
			]

			m = clean( m, 0, -h )

			const even = tabs%2 == 0
			const zero = offset == 0
			const full = offset == 1

			slots.forEach( (cc,ii) => {


				const first = ii < 2
				const odd = ii%2 == 0

				if (first && !even && !full) cc.x += t
				if (!first && !even && zero) cc.x += t
				if (first && even && !full) cc.x += t
				if (!first && even && !zero) cc.x += t

				if (!odd) cc.x -= size - t

				const ba = cc.x + cc.w == ww + x
				const bb = cc.x == x

				if (ba || bb) {
					cc.w += t
					if (!odd) cc.x -= t
				}


				const r = maker.move(
					new maker.rectangle( cc.w, cc.h),
					[cc.x,cc.y]
				)


				const k = 'slot' + i + '-' + ii
				m.models[ k ] = r
				const op = 'union'


				maker.combine( m.models.rect, m.models[ k ],false, true, false, true )
			})


			m = clean( m, 0, 0 )

			sides[s] = m

			x += ww + t
		}) 


		els.forEach( el => {
			const tar = el.target.value
			const all = { ...sides, ...faces }
			const rr = all[tar]
			const bb = makerjs.measure.modelExtents( rr )
			console.log('>>>>', tar, rr, bb)
		})

		console.log( '?', sides, faces )
		

		return maker.svg( { 
			models: { 
				sides: {
					models: sides,
					origin: [0,middle]
				}, 
				faces: {
					models: faces
				}
			} 
		})

	}


	function onKeyUp( e, t ) {
		if (e.keyCode === 13) e.target.blur()
	}

	$: total = {
		width: ( conf.depth * 2 ) + conf.width,
		height: ( conf.height * 2 ) + ( conf.depth * 2)
	}

	let sidebar = 'minw220px h100vh overflow-auto flex column-stretch-flex-start p1'


	function addElement( type ) {
		const arr = els
		els = []
		arr.push({
			target: ui( targets.top, 'target', TARGET),
			...type
		})
		els = arr
	}

	addElement( HOLES )
</script>

<main>

	<div class="flex row-stretch-stretch">
		<aside class={sidebar}>
			{#each Object.entries(conf) as [key, value]}
				<fieldset >
					<div class="mtb1">
						{value.name}
						<span class="fade">({value.unit})</span>
					</div>

					<input 
						on:keyup={onKeyUp} 
						type="number" 
						min={value.min}
						max={value.max}
						step={value.step || 1}
						bind:value={conf[key].value} 
						placeholder="width" />
				</fieldset>

			{/each}
		</aside>

		<section class="p1 grow flex column-center-center">
			{@html makerjs ? svg( conf ) : '' }

		</section>

		<aside class={sidebar}>
<!-- 
	const MM = 'mm'
	const NUM = 'num'
	const DEG = 'deg'
	const TARGET = 'target' -->
			{#each els as el}
				{#each Object.entries(el) as [key, value]}
					<fieldset >
						<div class="mtb1">
							{value.name}
							<span class="fade">({value.unit})</span>
						</div>

						{#if value.unit == TARGET }
							<select>
								{#each Object.entries(targets) as [k, v]}
									<option value={k} name={k}>{v}</option>
								{/each}
							</select>
						{:else}

							<input 
								on:keyup={onKeyUp} 
								type="number" 
								min={value.min}
								max={value.max}
								step={value.step || 1}
								bind:value={el[key].value} 
								placeholder="width">

						{/if}

					</fieldset>

				{/each}

			{/each}
			<div class="cmt1">
				<button on:click={e => addElement( HOLES )}>
					add holes
				</button>
			</div>
		</aside>


	</div>
</main>


<style lang="sass">
svg
	path
		stroke: white

</style>

