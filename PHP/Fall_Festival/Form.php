<?php

$servername = "127.0.0.1";
$username = "marioario";
$password = "!Banana0o";
$dbname = "Fall_Form";

$Plates=array();
$Names=array();

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$sql = "SELECT Plate,Name FROM Fall_Form";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        array_push($Plates, $row["Plate"]);
        array_push($Names, $row["Name"]);
    }
}
$conn->close();
?> 
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Fall Form</title>
     	<link href="resources/css/Form_style_sheet.css" rel="stylesheet" type="text/css">  
     	<link rel="icon" href="resources/images/mario.jpg"> 
     	<link href="resources/css/main_style_sheet.css" rel="stylesheet" type="text/css">
    </head>
    <body>
		<h1 class="Important">The Fall Festival</h1>
		<p class="Important">The seasonal festivals are a great way to kick back and relax with freinds and family,</p>
		<p class="Important"> and everyone loves the Fall Festival, where you get to cook for fun,</p>
		<p class="Important">but to be able to do so, please fill out the form below...</p>
		<br>
		<br>
		<form id="form" action="Fall_sql.php" method="get">
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
			<br>
			<br>
			<br>
			What plate would you like to prepare?<br> <br>
			Plate 1:  <input id="Plate1" type="radio" name="plate" value="Plate1"> <br>
			Plate 2:  <input id="Plate2" type="radio" name="plate" value="Plate2"> <br> 
			Appetizer :  <input id="Appetizer1" type="radio" name="plate" value="Appetizer1"> <br>
			Dessert:  <input id="Dessert" type="radio" name="plate" value="Dessert"> <br> <br> <br>
			Why would you like this plate?<br>
			<input type="text" name="why"> <br> <br>
			Email? <br><br>
			<input type="text" name="email"> <br> <br>
			<input type="submit" value="Submit">
		</form>
		<br><br>
		<br><br>
    </body>
    <script type="text/javascript">
		var Plates = <?php echo json_encode($Plates, JSON_PRETTY_PRINT) ?>; 
		for(var x=0;x<Plates.length;x++){
			document.getElementById(Plates[x]).disabled = true;
		}
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