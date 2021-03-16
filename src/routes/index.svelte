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


	function ui( value, name, min, max, step ) {
		return {
			value,
			name,
			min,
			max,
			step
		}
	}

	let conf = {
		width: ui( 200, 'box width'),
		height: ui( 251, 'box height'),
		depth: ui( 400, 'box depth'),
		thickness: ui( 10, 'material thickness', 0, 10),
		tabs: ui( 2, 'tabs amount'),
		offset: ui( 0, 'tabs offset', 0, 1, 0.1),
		overhang: ui( 20, 'case overhang'),
		slot: ui( 0, 'slot amount' ),
		size: ui( 10, 'slot size' )
	}


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

		const w = conf.width.value + t
		const h = conf.height.value
		let x = 0
		const y = h

		let faces = {}

		// const ff = ['top', 'bottom']
		// ff.forEach( (f, i) => {
		// 	const b = i%2 == 0
		// 	let xx = h + t
		// 	let yy = (b) ? (h * 1): h * 2
		// 	yy += t * 2
		// 	if (b) yy *= -1
		// 	faces[f] = { 
		// 		models: {
		// 			rect: new maker.rectangle(w,h) 
		// 		},
		// 		origin: [xx, yy]
		// 	}

		// })

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


				// console.log(cc.x + cc.w, ww + x)

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


		

		return maker.svg( { models: { ...sides, ...faces } } )

	}


	function onKeyUp( e, t ) {
		if (e.keyCode === 13) e.target.blur()
	}

	$: total = {
		width: ( conf.depth * 2 ) + conf.width,
		height: ( conf.height * 2 ) + ( conf.depth * 2)
	}
</script>

<main>

	<div class="flex row-stretch-stretch">
		<aside class="minw220px h100vh overflow-auto flex column-stretch-flex-start p1">
			{#each Object.entries(conf) as [key, value]}
				<fieldset >
					<div class="mtb1">{key}</div>

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

		<section class="p1 grow">
			{@html makerjs ? svg( conf ) : '' }

		</section>

	</div>
</main>


<style lang="sass">
svg
	path
		stroke: white

</style>

