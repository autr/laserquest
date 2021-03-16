<script>
	import { onMount } from 'svelte'
	import rison from 'rison'

	let makerjs
	let maker

	let save = false

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


		try {
			const hash = '('+window.location.hash.substring(1) + ')'
			const obj = rison.decode(hash)

			for (const [key, value] of Object.entries(obj.conf)) {
				if (key in conf && value != null) conf[key].value = value
			}
			els = []
			obj.els.forEach( (el, i) => {

				const neu = addElement( el.name )
				for (const [key, value] of Object.entries(el.props)) {
					if (key in neu.props && value != null) neu.props[key].value = value
				}
			})


		} catch(err) {
			console.warn('error decoding URI, skipping:', err.message)

			addElement( HOLES )
			addElement( HOLES )

			els[1].props.diameter.value = 50
			els[1].props.offset.value = 0
			els[1].props.count.value = 1

		}



	})

	// let mm = 332
 //  	let px = screen.width




	function ui( value, name, unit, min, max, step, title ) {
		return {
			value,
			name,
			min,
			max,
			step,
			unit,
			title
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
		screen: ui( 1, 'zoom', NUM, 1, null, null),
		width: ui( 145, 'width', MM, 20, null, null, 'box'),
		height: ui( 145, 'height', MM, 20),
		depth: ui( 145, 'depth', MM, 20),
		thickness: ui( 5, 'thickness', MM, 0, 20),
		tabs: ui( 9, 'tabs', NUM, 0, null, null, 'sides'),
		offset: ui( 1, 'offset', NUM, 0, 2, 0.05),
		overhang: ui( 5, 'overhang', MM, 2, null, null, 'panel'),
		// slot: ui( 0, 'slots', NUM, 0 ),
		size: ui( 10, 'size', MM, 0 )
	}

	const HOLES = 'hole(s)'

	const elements = {

		[HOLES]: {

			name: HOLES,
			props: {
				diameter: ui( 3, 'hole diameter', MM ),
				offset: ui( 60, 'hole offset', MM, 0),
				count: ui( 4, 'hole amount', NUM, 1 ),
				rotate: ui( 0, 'rotation', DEG )
			}
		}
	}

	let els = []



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

		const t = conf.thickness.value || 1
		const d = conf.depth.value || 1
		const tabs = conf.tabs.value || 1
		const size = conf.size.value || 1
		// const slot = conf.slot.value || 1
		const offset = parseFloat( conf.offset.value ) || 0
		const overhang = conf.overhang.value || 1

		let w = conf.width.value || 1
		let h = conf.height.value || 1

		w += t
		h += t

		let x = 0
		const y = h
		const middle = h + (overhang * 2) + (t * 3)

		let faces = {}

		const ff = ['top', 'bottom']
		ff.forEach( (f, i) => {
			let xx = h + t
			const mod = i%2 == 0
			const oo = overhang * 2
			const ww = w + oo + t
			const hh = h + oo + t
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

			ww += t 

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
					x: x + ww - (t * 2) + t,
					y: -t,
					w: size - t,
					h: t + 1
				},
				{
					x: x,
					y: d - 1,
					w: size,
					h: t + 1
				},
				{
					x: x + ww - (t * 2) + t,
					y: d - 1,
					w: size - t,
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

			m.origin = [0,middle]

			sides[s] = m

			x += ww + t
		}) 

		let paths = {}

		els.forEach( (el, idx) => {
			const targs = el.props.target.value


			Object.keys(targs).forEach( key => {

				const b = targs[key]
				const all = { ...sides, ...faces }
				const rect = all[key]
				const diameter = el.props.diameter.value || 1
				const offset = el.props.offset.value || 0
				const rotate = el.props.rotate.value || 0
				const count = el.props.count.value || 1

				if (!b || !rect) return

				const bb = makerjs.measure.modelExtents( rect )
				const center = bb.center
				let deg = 360 / count

				console.log('bounding box ~', key, bb.width, bb.height)

				for (let i = 0; i < count;i++) {
					const cir = { 
						type: 'circle', 
						origin: center,
						radius: diameter
					}
					const k = 'circle-' + key + '-' + idx + '-' + i

					maker.move( cir, [offset + center[0], center[1]])

					let rot = rotate + (i * deg)

					makerjs.path.rotate( cir, rot, center )
					paths[k] = cir
				}
			})
		})

		
		final = { 
			models: { 
				sides: {
					models: sides
				}, 
				faces: {
					models: faces
				}
			},
			paths
		} 


		makerjs.model.mirror( final, true, true )

		if (save) {

	 
			try {

				let uri = { conf: {}, els: [] }

				Object.keys(conf).forEach( k => uri.conf[k] = conf[k].value )
				els.forEach( el => {
					let o = { props: {}, name: el.name }
					Object.keys(el.props).forEach( k => o.props[k] = el.props[k].value )
					uri.els.push(o)
				})
				window.location.hash = rison.encode_object(uri);

			} catch(err) {
				console.warn('error encoding URI, skipping:', err.message)
			}
		}

		save = true

		return maker.svg( final )

	}

	let final


	function onKeyUp( e, t ) {
		if (e.keyCode === 13) e.target.blur()
	}


	let sidebar = 'h100vh overflow-auto flex column-stretch-space-between p1'


	function addElement( type ) {
		const arr = els
		els = []
		let ob = {}
		Object.keys(targets).map( k => ob[k] = false )
		ob.top = true
		let o = JSON.parse( JSON.stringify( elements[type] ) )
		o.props.target = ui( ob, 'target', TARGET)
		arr.push(o)
		els = arr
		return arr[arr.length-1]
	}

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

	function onCheck( i, a, b, v ) {



	}

	function removeEl( i ) {
		let st = els
		els = []
		st.splice(i,1)
		els = st
	}
</script>

<main>

	<div class="flex row-stretch-stretch h100vh overflow-hidden">
		<aside class={sidebar + ' maxw230px bg-b'}>
			<div>
				{#each Object.entries(conf) as [key, value]}
					{#if value.title}
						<div class="mb1 bt1-solid pt1"># {value.title}</div>
					{/if}
					<fieldset class="flex mb1 minw200px">
						<div class="w120px">
							{value.name}
							<span class="fade">({value.unit})</span>
						</div>

						<input 
							on:keyup={onKeyUp} 
							class="grow"
							type="number" 
							min={value.min}
							max={value.max}
							step={value.step || 1}
							bind:value={conf[key].value} 
							placeholder="width" />
					</fieldset>

				{/each}
			</div>
			<div class="cmb1">
				<button class="filled w100pc" on:click={e => download('toSVG', 'svg') }>SVG</button>
				<button class="filled w100pc" on:click={e => download('toDXF', 'dxf') }>DXF</button>
				<button class="filled w100pc" on:click={e => download('toOpenJsCad', 'ojscad') }>JSCAD</button>
				<a href="https://autr.tv" target="_blank">autr.tv</a>
			</div>
		</aside>

		<section 
			class="overflow-auto p1 grow flex column-center-center rel">
			<div style={`transform: scale( ${conf.screen.value} ); transform-origin: 0 0`}>	
				{@html makerjs ? svg( conf, els ) : '' }
			</div>
		</section>

		<aside class={sidebar + ' maxw320px bg-a'}>
			{#each els as el, i}
				<div class="bb1-solid">
					<div class="mtb1 flex row-space-between-flex-start">
						<div>#{i+1} {el.name}</div>
						<button on:click={ e => removeEl(i) } class="cross w1em"></button>
					</div>
					{#each Object.entries(el.props) as [key, value]}  
						<fieldset class="flex mb1 minw280px ">
							<div class="w160px">
								{value.name}
								<span class="fade">({value.unit})</span>
							</div>

							{#if value.unit == TARGET }
								<div>
									{#each Object.entries(targets) as [k, v]}
										<label class="checkbox relative">
											<input 
												type="checkbox"
												on:change={ e => onCheck( i, key, k, els[i].props[key].value[k]) }
												bind:checked={els[i].props[key].value[k]}>
											<span></span>
											{v}
										</label>
									{/each}
								</div>
							{:else}

								<input 
									class="grow"
									on:keyup={onKeyUp} 
									type="number" 
									min={value.min}
									max={value.max}
									step={value.step || 1}
									bind:value={els[i].props[key].value} 
									placeholder="width">

							{/if}

						</fieldset>

					{/each}
				</div>

			{/each}
			<div class="cmt1">
				<button class="grow filled w100pc" on:click={e => addElement( HOLES )}>
					add hole(s)
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

