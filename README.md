AjaxFileUpload
==============

File upload using jQuery

This plugin uses FileAPI (http://www.w3.org/TR/FileAPI/) to get the selected file. It does not use the traditional way of dynamically creating an iframe, 
instead it uses FormData Object(http://www.w3.org/TR/2010/WD-XMLHttpRequest2-20100907/#the-formdata-interface).

Step 1
------
Make an AJAX call to upload the file. 

Create a FormData object. 
And then append the files (captured using FileAPI, on change event of the input element) to the FormData object. 
Submit this object to the server using Ajax call.

On successful upload, invoke the next Ajax call to submit the other form fields.

The server call should return a JSON in the following format.
{
"success" : true/false,
"filename" : "Name/path of the filename",
"message": "Error message in case if status is false."
}

Step 2
------

Serialize the form using .serialize() method of JQuery. Then append the filename to the object and submit it to the server using an AJAX call.

The server call should return a JSON in the following format.
{
"success" : true/false,
"message": "Error message in case if status is false."
}

