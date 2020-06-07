<?php

header('Content-Type: application/json');


$language = $_GET['l']; 


//connection & query
if (!$link = mysqli_connect('localhost', 'migio', null,'my_migio')) {
    echo 'Could not connect to mysql';
    exit;
}

//SELECT
$sql = 'SELECT Title, Rule, Author, Icon, Weight, Lang, Game, Link, CONCAT(\'<audio src="soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_positive_response_02"/> \',AlexaSpeak) as AlexaSpeak FROM StartingPlayerRules';

//FILTERS
switch($language)
{
	case "IT":
		$sql .= " where Lang = 'it_IT'";
		break;
	case "EN":
		$sql .= " where Lang = 'en_US'";
		break;
	default;
		break;
}
if(isset($_GET['ch'])) {
	switch($_GET['ch'])
	{
		case "web":
			$sql .= " and Channel in (0,1)";
			break;
		case "alexa":
			$sql .= " and Channel in (0,2)";
			break;
		case "telegram":
			$sql .= " and Channel in (0,3)";
			break;
		default;
			$sql .= " and Channel = 0";
			break;
	}
}
if(isset($_GET['id']))
{
	$sql .= 'and IdRule = '. mysqli_real_escape_string($link,$_GET['id']);
} 

//ORDERS
$sql .= " ORDER BY RAND()";

//LIMITS
if(isset($_GET['limit']))
{
	$sql .= 'LIMIT '. mysqli_real_escape_string($link,$_GET['limit']);
} 

//$sql .= " and link is not null";

$result = mysqli_query($link, $sql);

if (!$result) {
    echo 'DB Error, could not query the database\n';
    echo 'MySQL Error: ' . mysql_error();
    exit;
}

$rows = array();
while ($row = mysqli_fetch_assoc($result)) {  
    $rows[] = $row;
}





//gestione out
function utf8ize($d) {
    if (is_array($d)) {
        foreach ($d as $k => $v) {
            $d[$k] = utf8ize($v);
        }
    } else if (is_string ($d)) {
        return utf8_encode($d);
    }
    return $d;
}

echo json_encode(utf8ize($rows));















//close conncetion
mysqli_free_result($result);
mysqli_close($link);

?>









