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
		<br>
		<footer id="footer">
    		<p>Powered by Mario Studios</p>
    		<img alt="Mario Studios Logo" src="resources/images/mario.jpg" height="100px"><br>
    		<p id="dont">Please don't donate today.</p>
    	</footer>
	</body>
</html>