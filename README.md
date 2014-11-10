AjaxFileUpload
==============

File upload using jQuery

This plugin uses FileAPI (http://www.w3.org/TR/FileAPI/) to get the selected file. 

Step 1
------
Make an AJAX call to upload the file. 

Step 2
------
On callback of the previous AJAX call submit the other form fields along with the file name. For this the 
first call should return the file name.