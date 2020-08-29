function scheduleRequest(url, data, callback) {
	$.ajax({
		url: url,
		data: data,
	}).done(function (data) {
		if (data === true) {
			callback();
		}
		else {
			setTimeout(scheduleRequest(url, data, callback), 1000);
		}
	})
}