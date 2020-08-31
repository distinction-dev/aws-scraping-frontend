/*
	===============================================
	This file deals with the reactive ui changes
	===============================================
*/

/**
 * Event Listener to add the transition effect.
 * When a user clicks the tab links, this translates the main container accordingly
 */
$('[data-toggle="tab"]').on("click", function (event) {
	// Check if user clicked analyze or not
	if ($(event.originalEvent.target).attr("href") === "#analyze") {
		// Translate the main container 100vw to the left
		$("main").addClass("right");
	}
	else {
		// Translate the main container 100vw to the right
		$("main").removeClass("right");
	}
});

/**
 * Event Listener to make changes based on the value of the the switch
 */
$("#debugSwitch").on("change", function () {
	// If debug mode is on, i.e the switch is checked/active/on
	if (this.checked) {
		// Hide the alert
		$(".debug-switch-container .alert").removeClass("d-none");

		// Hide the input group
		$(".form-group").addClass("d-none");

		// Remove the required attribute
		$("#scrappingInput").attr("required", false)

		// Set the default value to the input
		$("#scrappingInput").val("gmail.com");
	}
	else {
		// Show the alert
		$(".debug-switch-container .alert").addClass("d-none");

		// Show the input
		$(".form-group").removeClass("d-none");

		// Add the required attribute
		$("#scrappingInput").attr("required", true)
	}
});

/**
 * Event listener that changes the styles to loading
 */
$("form").on("submit", function (event) {
	// Preventing the default method of submitting
	event.preventDefault();

	// Find the child formg-roup and add submitting class
	$(this).children(".form-group").addClass("submitting");

	// Add submitting class to the submit button as well
	$(this).children("button[type=submit]").addClass("submitting");

	// Remove the hiding class of the image
	$(this).siblings(".image").removeClass("d-none");
	$(this).siblings(".image-message").removeClass("d-none");

	// Hide the list-group
	$(this).siblings(".list-group").addClass("d-none");
});

$("form").on("finished", function (event, output) {
	// Find the child formg-roup and remove submitting class
	$(this).children(".form-group").removeClass("submitting");

	// Remove submitting class from the submit button as well
	$(this).children("button[type=submit]").removeClass("submitting");

	// Add the hiding class to the image and message
	$(this).siblings(".image").addClass("d-none");
	$(this).siblings(".image-message").addClass("d-none");

	// get the list from the output
	const filteredResult = output.filter((res) => {
		return res[1] === 1;
	});

	let finalListContentHtmlString = "";
	// Add the list group to the list
	filteredResult.forEach((res) => {
		finalListContentHtmlString += `<li class="list-group-item">${res[0]}</li>`
	});

	// Change the html of the list group
	$(this).siblings(".list-group").html($(finalListContentHtmlString))
	// Show the list-group
	$(this).siblings(".list-group").removeClass("d-none");
})