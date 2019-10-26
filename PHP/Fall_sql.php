 <?php
$Name=$_REQUEST['name']; 
$Plate=$_REQUEST['plate'];
$Why=$_REQUEST['why'];
$servername = "127.0.0.1";
$username = "marioario";
$password = "Stop Looking at my Passcode!!!";
$dbname = "Fall_Form";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO Fall_Form (Name,Plate,Why)
VALUES ('$Name', '$Plate', '$Why')";

if ($conn->query($sql) === TRUE) {
    echo "Thank you for filling out this form! Your plate is: ". $Plate;
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?> 
