 <?php
$servername = "127.0.0.1";
$username = "marioario";
$password = "!Banana0o";
$dbname = "Fall_Form";

$Plates=array();
$Name=array();

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
        array_push($Name, $row["Name"]);
    }
}
$conn->close();
?> 
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Fall Form</title>
     	<link href="resources/css/style_sheet.css" rel="stylesheet" type="text/css">   
    </head>
    <body>
		<h1 class="Important">The Fall Festival</h1>
		<p class="Important">The seasonal festivals are a great way to kick back and relax with freinds and family,</p>
		<p class="Important"> and everyone loves the Fall Festival, where you get to cook for fun,</p>
		<p class="Important">but to be able to do so, please fill out the form below...</p>
		<br>
		<br>
		<form id="form" action="Fall_sql.php" method="get">
			Name?<br>
			<select name="name">
				<option value="Mario" id="Mario" >Mario</option>
				<option value="Elena" id="Elena">Elena</option>
				<option value="Isabel" id="Isabel">Isabel</option>
				<option value="Javier" id="Javier">Javier</option>
				<option value="Elizabeth" id="Elizabeth">Elizabeth</option>
			</select>
			<br>
			<br>
			<br>
			What plate would you like to prepare?<br> <br>
			Plate 1:  <input id="Plate1" type="radio" name="plate" value="Plate1"> <br>
			Plate 2:  <input id="Plate2" type="radio" name="plate" value="Plate2"> <br> 
			Appetizer 1:  <input id="Appetizer1" type="radio" name="plate" value="Appetizer1"> <br>
			Appetizer 2:  <input id="Appetizer2" type="radio" name="plate" value="Appetizer2"> <br>
			Dessert:  <input id="Dessert" type="radio" name="plate" value="Dessert"> <br> <br> <br>
			Why?<br>
			<input type="text" name="why"> <br> <br>
			<input type="submit" value="Submit">
		</form>
    </body>
    <script type="text/javascript">
		var Plates = <?php echo json_encode($Plates, JSON_PRETTY_PRINT) ?> 
		for(var x=0;x<Plates.length;x++){
			document.getElementById(Plates[x]).disabled = true;
		}
		var Names = <?php echo json_encode($Name, JSON_PRETTY_PRINT) ?>
		for(var x=0;x<Names.lenght;x++){
			document.getElementById(Names[x]).disabled = true;
		}	
    </script>
</html>