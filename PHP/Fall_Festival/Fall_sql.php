<!DOCTYPE html>
<html>
    <head>
    	<meta charset="utf-8">
        <title>Fall Form</title>
        <link href="resources/css/sql_style_sheet.css" rel="stylesheet" type="text/css">
        <link rel="icon" href="resources/images/mario.jpg"> 
        <link href="resources/css/main_style_sheet.css" rel="stylesheet" type="text/css">
    </head>
    <body>
    	<h1>Thanks for filling out the form!</h1>
		<br>
		<br>

<?php
include 'Form_Utils.php';

$cookieCode=$_REQUEST['name']; 
$Plate=$_REQUEST['plate'];
$Why=$_REQUEST['why'];
$Email=$_REQUEST["email"];
$servername = "127.0.0.1";
$username = "marioario";
$password = "STOP LOOKING AT MY PASSCODE!!!";
$dbname = "Fall_Form";

$userInCookie=getUserFromCookieCode();
$Name= $userInCookie[$cookieCode];

setCookieValue($cookieCode);

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO Fall_Form (Name,Plate,Why)
VALUES ('$Name', '$Plate', '$Why')";

if ($conn->query($sql) === TRUE) {
    echo "Thank you for filling out this form, ".$Name."! ". "Your plate is: ". $Plate;
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
		<br>
		<a href="Form.php">Click here to return to the form.</a>
		<!--  
		<footer id="footer">
    		<p>Powered by Mario Studios</p>
    		<img alt="Mario Studios Logo" src="resources/images/mario.jpg" height="100px"><br>
    		<p id="dont">Please don't donate today.</p>
    	</footer>
    	-->
    </body>
</html> 
<?php
//Email to me
$to = 'marioawesome1978@gmail.com';
$subject = 'Cooking Form';
$message = $Name.' responded to your form! Check your database.';
$headers = 'From: pointbreak565@gmail.com';

mail($to, $subject, $message, $headers);


//Email to person
$to2=$Email;
$subject2="Fall Festival";
$message2 ="Thanks, ".$Name." for cooking ".$Plate. ". The cooking contest is on Thursday, November 28.";
$headers2="From: pointbreak565@gmail.com";

mail($to2,$subject2,$message2,$headers2);
?>
