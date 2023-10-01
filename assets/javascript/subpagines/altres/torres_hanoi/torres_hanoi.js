window.addEventListener('load', function () {
	const opcio_triada = document.getElementById("tria-n");
	const div_binari_div = document.getElementById("memoritzador_binari");

	//div_binari_div.style.display = 'none';
	//hex_to_bin_div.style.display = 'none';
	//bin_to_hex_div.style.display = 'none';

	const video_elem = document.getElementById("hanoi-video-elem");
	video_elem.autoplay = true; 
	video_elem.loop = true; 

	opcio_triada.onchange = function () {
		let n = opcio_triada.value;
		if (n == "No_Triat") {
			video_elem.src = null;
			return;
		} else {
			video_elem.width = Math.min(n * 128, 1000); 
			const file_name = "/assets/media/hanoi/hanoi_render_" + n + ".webm";
			console.log("Carregant: " + file_name);
			video_elem.src = file_name;
			video_elem.load();
		}

	};
})

