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

	})


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
		width: ui( 145, 'box width', MM, 20),
		height: ui( 145, 'box height', MM, 20),
		depth: ui( 145, 'box depth', MM, 20),
		thickness: ui( 5, 'material thickness', MM, 0, 20),
		tabs: ui( 9, 'side tabs count', NUM, 0),
		offset: ui( 1, 'side tabs offset', NUM, 0, 2, 0.05),
		overhang: ui( 5, 'panel overhang', MM, 2),
		slot: ui( 0, 'panel slots', NUM, 0 ),
		size: ui( 10, 'panel slot size', MM, 0 )
	}

	const HOLES = {
		diameter: ui( 3, 'hole diameter', MM ),
		offset: ui( 60, 'hole offset', MM, 0),
		count: ui( 4, 'hole amount', NUM, 1 ),
		rotate: ui( 0, 'rotation', DEG )
	}

	let els = [

	]



	function svg( conf, els ) {

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
				origin: [xx - overhang + t, mod ? 0 : middle + d + (t * 2)]
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


		// left, front, back, right

		ss.forEach( (s, i) => {

			let ww = ((i%2 == 0) ? h : w)

			ww += t // REMOVE THIS

			let m = {
				models: {
					rect: new maker.rectangle(ww, d)
				},
				origin: [x, y]
			}

			const seg = d / (tabs / 2 )
			for (let i = 0; i < ( tabs / 2 ) + 1 ; i++ ) {
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

			// panel slots...

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


				const ba = cc.x + cc.w == ww + x
				const bb = cc.x == x

				if (ba || bb) {
					cc.w += t
					if (ii%2 != 0) cc.x -= size // righthand
				} else {
					cc.x -= size
					cc.w += size + (t-size)

				}

				const first = ii < 2
				const odd = ii%2 == 0

				// if (first && !even && !full) cc.x += t
				// if (!first && !even && zero) cc.x += t
				// if (first && even && !full) cc.x += t
				// if (!first && even && !zero) cc.x += t

				// if (!odd) cc.x -= size - t



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

		let paths = {}

		els.forEach( (el, idx) => {
			const tar = el.target.value
			const all = { ...sides, ...faces }
			const rr = all[tar]
			const bb = makerjs.measure.modelExtents( rr )
			const count = el.count.value
			const center = bb.center
			let deg = 360 / count

			console.log(bb)
			for (let i = 0; i < count;i++) {
				const cir = { 
					type: 'circle', 
					origin: center,
					radius: el.diameter.value
				}
				const k = 'circle-' + idx + '-' + i

				maker.move( cir, [el.offset.value + center[0], center[1]])

				let rot = el.rotate.value + (i * deg)

				makerjs.path.rotate( cir, rot, center )
				paths[k] = cir
			}
		})
		
		final = { 
			models: { 
				sides: {
					models: sides,
					origin: [0,middle]
				}, 
				faces: {
					models: faces
				}
			},
			paths
		} 

		return maker.svg( final )

	}

	let final


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
			...JSON.parse( JSON.stringify( type ) )
		})
		els = arr
	}

	addElement( HOLES )
	addElement( HOLES )

	els[1].diameter.value = 50
	els[1].offset.value = 0
	els[1].count.value = 1

	function download( op, ext ) {

		const file = makerjs.exporter[op]( final, {
			units: 'mm'
		}) 

		let el = document.createElement('a')
		el.setAttribute('href', 'data:text/plaincharset=utf-8,' + encodeURIComponent(file))
		el.setAttribute('download', `boxinator.${ext}`)

		el.style.display = 'none'
		document.body.appendChild(el)

		el.click()

		document.body.removeChild(el)
	}
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

		<section class="p1 grow flex column-center-center rel">
			<div class="flex abs t1 r1">
				<button on:click={e => download('toSVG', 'svg') }>SVG</button>
				<button on:click={e => download('toDXF', 'dxf') }>DXF</button>
				<button on:click={e => download('toOpenJsCad', 'ojscad') }>JSCAD</button>
			</div>
			{@html makerjs ? svg( conf, els ) : '' }
		</section>

		<aside class={sidebar}>
			{#each els as el}
				{#each Object.entries(el) as [key, value]}
					<fieldset >
						<div class="mtb1">
							{value.name}
							<span class="fade">({value.unit})</span>
						</div>

						{#if value.unit == TARGET }
							<div class="select">
								<select bind:value={el[key].value}>
									{#each Object.entries(targets) as [k, v]}
										<option value={k} name={k}>{v}</option>
									{/each}
								</select>
							</div>
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

