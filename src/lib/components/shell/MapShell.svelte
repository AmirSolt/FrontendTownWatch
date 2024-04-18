<div class="w-screen h-screen relative">
	<div class="absolute top-2 right-0 w-full widget-layer-map-z-1">
		<div class="flex flex-col justify-center items-center gap-2">
			<div class="flex justify-center items-center px-2 w-full">
				<slot name="row1" />
			</div>
			<div class="flex justify-center items-center px-2 w-full">
				<slot name="row2" />
			</div>
			<div class="flex justify-center items-center px-2 w-full">
				<slot name="row3" />
			</div>
		</div>
	</div>

	<slot name="map" />
</div>
