// Define the input listener that changes the styles to loading
$("form").on("submit", function (event) {
	// Preventing the default method of submitting
	event.preventDefault();
	$(this).children(".form-group").addClass("submitting");
	$(this).children("button[type=submit]").addClass("submitting");
	$(this).siblings(".image").attr("style", "background-image: url('" + $(this).data("loading-image") + "');").addClass("ready");
});

// Define the scraping listener
$("#scrappingForm").on("submit", function (event) {
	event.preventDefault();
	const url = $("#scrappingInput").val();
	const data = {
		"url": url
	};
	console.log(data);
	fetch("https://q6qayimd70.execute-api.us-east-1.amazonaws.com/default/ScrapperInvokerFunction", {
		method: 'POST',
		mode: 'no-cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}).then((response) => {
		console.log(response);
	}).catch((error) => {
		console.log(error);
	});
});

// Define the analysis listener
$("#analyzingForm").on("submit", function (event) {
	event.preventDefault();
})