<?php

require ('config.php');
 
$date = new DateTime();

$email_to = ADMIN_EMAIL;
$email_subject = "[migio.altervista] Starting Player SUGGESTION!" . $date->getTimestamp();

$lingua = $_GET['l']; 
$proposta = $_GET['p']; 
$autore = $_GET['a'];  
$gioco = $_GET['g'];   
$id = $_GET['id'];  
$rule = $_GET['rule']; 


$email_message = "Ecco la frase suggerita:\n\n";
 
function clean_string($string) {
  $bad = array("content-type","bcc:","to:","cc:","href");
  return str_replace($bad,"",$string);
} 

$email_message .= "Lingua: ".clean_string($lingua)."\n";
$email_message .= "Proposta: ".clean_string($proposta)."\n";
$email_message .= "Autore: ".clean_string($autore)."\n";
$email_message .= "Gioco: ".clean_string($gioco)."\n";
$email_message .= "[id]: ".clean_string($id)."\n";
$email_message .= "[Rule]: ".clean_string($rule)."\n";

// create email headers
$headers = 'From: '."noreply@migio.altervista.org"."\r\n".
'Reply-To: '."noreply@migio.altervista.org"."\r\n" .
'X-Mailer: PHP/' . phpversion();


//connection & query
if (!$link = mysqli_connect('localhost', 'migio', null,'my_migio')) {
    echo json_encode(["error" => 'Could not connect to mysql']);
    exit;
}

$lingua = mysqli_real_escape_string($link,$lingua); 
$proposta = mysqli_real_escape_string($link,$proposta); 
$autore = mysqli_real_escape_string($link,$autore); 
$gioco = mysqli_real_escape_string($link,$gioco); 

$sql = 'INSERT INTO `StartingPlayerRules`(`Rule`, `Author`, `Lang`, `Channel`) VALUES (\''.$proposta.'\',\''.$autore.'\',\''.$lingua.'\',99)';

$result = mysqli_query($link, $sql);

//close conncetion
mysqli_free_result($result);
mysqli_close($link);


header('Content-Type: application/json');

//rule per unit test
if($rule !== "3ababfe1-0640-4e7e-b508-87887205ee18")
{
    $sendMail = @mail($email_to, $email_subject, $email_message, $headers);  
    echo json_encode(["sendMail" => $sendMail]);
}
else  
{
    echo json_encode(["lingua" => $lingua, "proposta" => $proposta, "autore" => $autore, "gioco" => $gioco, "result" => $result]);
}


?>