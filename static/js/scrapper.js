/*
===========================================================
	This file contains javascript code needed to use the
	web scraping + analysis api.
	Conditions:
	The javascript code	ES2017 syntax and apis which are:
	* Arrow Functions
	* Promises
	* Fetch Api
	Please refer caniuse.com to check if the browser supports these or not
===========================================================
*/

/**
 * Event listener that scrapes when the form is submitted
 */
$("#scrappingForm").on("submit", function () {
	// Start showing the scrapping animation
	changeImage("scraping", "Scrapping the website");

	// Check if the application is in debug mode
	const isDebugMode = $("#debugSwitch").get(0).checked;
	// Invoke the scrapper
	callApi("ScrapperInvokerFunction", {
		url: $("#scrappingInput").val()
	}).then((scrappingInvokerResponse) => {
		let id = scrappingInvokerResponse["file_name"];
		if (isDebugMode) {
			id = "temp1598645781.61118320";
		}
		checkStatus("ScrapperProgressCheckerFunction", {
			"id": id
		}).then(() => {
			callApi("PredictionInvokerFunction", {
				"id": id
			}).then((predictionInvokerResponse) => {

				// Start showing the scrapping animation
				changeImage("analyzing", "Predicting the website");
				checkStatus("PredictionProgressCheckerFunction", {
					"id": predictionInvokerResponse["file_name"]
				}).then(() => {
					callApi("PredictionExtractionFunction", {
						"id": predictionInvokerResponse["file_name"],
					}).then((prediction) => {
						console.log(prediction);
						$("#scrappingForm").trigger("finished", [prediction["output"]]);
					});
				});
			});
		})
	});
});

const checkStatus = (url, data) => {
	return new Promise((resolve) => {
		callApi(url, data).then((response) => {
			if (response.status === true) {
				resolve();
			}
			else {
				setTimeout(function () {
					resolve(checkStatus(url, data))
				}, 30000);
			}
		});
	});
}

/**
 * This method is the base method for making api calls
 * @param {String} url The api endpoint to hit
 * @param {Object} data The data to send along
 */
const callApi = (url, data) => {
	// Return a new promise which will get resolved when the server responds.
	return new Promise((resolve, reject) => {
		fetch(`https://q6qayimd70.execute-api.us-east-1.amazonaws.com/${url}`, {
			method: 'POST',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		}).then((response) => response.json()).then((response) => {
			// Resolve this promise with the response recieved
			resolve(response);
		}).catch((error) => {
			// Reject this promise with the error recieved
			reject(error)
		});
	})
}

/**
 * This method displays hints and messages to the user while the scrapper runs
 * @param {String} status Status of the api
 * @param {String} message What message to show
 */
function changeImage(status, message) {
	var bgUrl = "";
	switch (status) {
		case "scraping":
			bgUrl = "static/images/scrapping.gif";
			break;
		case "analyzing":
			bgUrl = "static/images/analysis.gif";
			break;
		case "error":
			bgUrl = "static/images/error.png";
			break;
	}
	$("#scrappingForm").siblings(".image").attr("style", `background-image: url('${bgUrl}');`);
	$("#scrappingForm").siblings(".image-message").html(message);
}