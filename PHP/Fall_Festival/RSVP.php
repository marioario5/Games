<?php

$servername = "127.0.0.1";
$username = "marioario";
$password = "!Banana0o";
$dbname = "Fall_Form";

$Names=array();

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$sql = "SELECT Name FROM Fall_RSVP";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        array_push($Names, $row["Name"]);
    }
}
$conn->close();
?> 
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>RSVP Form</title>
		<link href="resources/css/RSVP_style_sheet.css" rel="stylesheet" type="text/css"> 
		<link rel="icon" href="resources/images/mario.jpg"> 
		<link href="resources/css/main_style_sheet.css" rel="stylesheet" type="text/css">
	</head>
	<body>
		<h1 id="header">RSVP Form</h1>
		<p id="main_p">Everyone loves being at the Fall Festival, but to<br> participate you need to be able to enter! Luckly, that problem has an easy fix, filling out this form!</p>
		<br>
		<form action="RSVP_sql.php">
			<?php
			include "Form_Utils.php";
			
			$Name=getUserFromCookie();
			
			if($Name != "Not Known"){
                echo "Hello, ".$Name;
			}else{
		    ?>
				Name?<br>
				<select name="name" id="name">
					<?php
				    $users=getUsers();
				    foreach ($users as $key => $value) {
                        echo '  <option value="'.$value.'" id="'.$key.'">'.$key.'</option>'."\n";
			        }       
			}
				    ?>
			</select>
			<br><br>
			Can you make it?<br>
			<input id="Yes" type="radio" name="can" value="Yes"> Yes <br>
			<input id="No" type="radio" name="can" value="No"> No <br>
			<input id="Maybe" type="radio" name="can" value="Maybe"> Maybe <br>
			<br><br>
			# of additional guests? (if none, mark 0)<br><br>
			<input type="text" name="guests" id="guests"> <br> <br> <br> 
			Email? <br><br>
			<input type="text" name="email"> <br> <br>
			<input type="submit" value="Submit">
		</form>
		<br><br>
		<br><br>
		<br><br>
		<br><br>
	</body>
	<script type="text/javascript">
	var Names = <?php echo json_encode($Names, JSON_PRETTY_PRINT) ?>;
	var nameFromCode = <?php echo json_encode(getUserFromCookieCode(), JSON_PRETTY_PRINT) ?>;
	
	// Get all options within <select id='foo'>...</select>
	var op = document.getElementById("name").getElementsByTagName("option");	
	for (var i = 0; i < op.length; i++) {		
		// lowercase comparison for case-insensitivity		
		var n = Names.includes(nameFromCode[op[i].value]);
	    if (n) {
	  		op[i].disabled = true;
	  	}
	}
	</script>
</html>