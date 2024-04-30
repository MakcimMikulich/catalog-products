<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

error_reporting(E_ALL);
ini_set('display_errors', 1);

$curl = curl_init();

$body = (object) [
  'CRC' => '',
  'Packet' => (object) [
      'JWT' => 'null',
      'MethodName' => 'EvrooptSite.GetListing',
      'ServiceNumber' => '38198019-8D9A-474E-856B-ED5439DBFB26',
      'Data' => (object) [
          'ListingId' => 1,
          // 'SortingId' => -1,
          // "CategoryListId" => -1,
          'SortingId' => $data['SortingId'],
          'CategoryListId' => $data['CategoryListId']

      ]
  ]
];

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://rest.eurotorg.by/10197/Json',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS =>json_encode($body),
  CURLOPT_HTTPHEADER => array(
    'Content-Type: application/json'
  ),
  CURLOPT_SSL_VERIFYPEER => false,
));

$response = curl_exec($curl);

curl_close($curl);


echo ($response);
?>

