/**
 * This uses FileAPI. Not supported in all the browsers
 * 
 * @param $
 */
(function($) {
	$.fn.fileupload = function(options) {
		var settings = {
			action : '',
			onStart : function() {
				console.log('starting upload');
			},
			onComplete : function(response) {
				console.log(response);
			},
			onError : function(response) {
				console.log(response);
			},
			submit : undefined
		};

		if (options) {
			$.extend(settings, options);
		}

		var _self = this; // form
		var files = undefined;

		var uploadFile = function(event) {

			settings.onStart.apply(this,[]);
			
			if (files) {
				var formData = new FormData();

				$.each(files, function(key, value) {
					formData.append(key, value);
				});

				$.ajax({
					url : settings.action + '?files',
					data : formData,
					processData : false,
					contentType : false,
					type : 'POST',
					cache : false,
					dataType : 'json'
				}).done(function(data) {

					if (data.success === true) {
						// settings.onComplete();
						settings.onComplete.apply(this, [ data ]);
						submitData(event, data.fileName);
					} else {
						settings.onError.apply(this, [ data.message ]);
					}
				}).fail(function(jqXHR, textStatus, errorThrown) {
					settings.onError.apply(this, [ textStatus ]);
				});
			} else {
				// in case if there is no file selected for upload, it should
				// process the formdata as usual
				submitData(event);
			}

		};

		var submitData = function(event, filename) {

			$form = $(event.target);

			var formData = $form.serialize();

			// pass the filename along with the formdata
			formData = formData + '&filename=' + filename;

			$.ajax({
				url : settings.action,
				data : formData,
				type : 'POST',
				cache : false,
				dataType : 'json'
			}).done(function(data) {
				if (data.success === true) {
					settings.onComplete.apply(this, [ data ]);
				} else {
					settings.onError.apply(this, [ data.message ]);
				}
			}).fail(function(jqXHR, textStatus, errorThrown) {
				settings.onError.apply(this, [ textStatus ]);
			}).always(function(d) {
				settings.onComplete.apply(this, [ d ]);
			});

		};

		if (settings.submit != undefined) {
			console.log('Submit button is ' + settings.submit);
			$(settings.submit).on('click', function(e) {
				e.preventDefault();
				_self.submit();
			});
		}

		this.submit(function(e) {
			e.preventDefault();
			e.stopPropagation();

			uploadFile(e);
		});

		this.find('input[type=file]').on('change', function(e) {

			if (!window.File) {
				console.log('FileAPI not supported in this browser');
			}
			files = e.target.files;
		});

		return this;
	};
})(jQuery);