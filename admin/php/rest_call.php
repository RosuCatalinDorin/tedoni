<?php
/**
 * Created by PhpStorm.
 * User: Paul.Sas
 * Date: 01/09/2017
 * Time: 7:08 PM
 */
require_once ('rest.php');
if (isset($_GET)){
    if ($_GET['op']=='find_clients'){
        unset($_GET['op']);
        $url='http://soaprod.bt.wan:7777/Enterprise/Services/RESTQueryCustomerService/customer/query?';

        $request = new RestRequest($url, 'GET');
        $request->buildPostBody($_GET);
        $request->execute();
        goto end_get;
    }
    if ($_GET['op']=='clientData'){
        unset($_GET['op']);
        $url='http://soaprod.bt.wan:7777/Enterprise/Services/RESTQueryCustomerDBService/customer/db/query?';

        $request = new RestRequest($url, 'GET');
        $request->buildPostBody($_GET);
        $request->execute();
        goto end_get;
    }
    if ($_GET['op']=='clientAccount'){
        unset($_GET['op']);
        $url='http://soaprod.bt.wan:7777/Enterprise/Services/RESTQueryCustomerAccountsService/accounts/query?';

        $request = new RestRequest($url, 'GET');
        $request->buildPostBody($_GET);
        $request->execute();
        goto end_get;
    }
    end_get:
    if (isset($request)){
        if ($request->getStatus()==200) echo $request->getData();
        else {
            http_response_code($request->getStatus());
        }
    }

    exit();
}

if (isset($_POST)){

    if ($_POST['op']=='find_clients'){
        unset($_POST['op']);
        $url='http://soaprod.bt.wan:7777/Enterprise/Services/RESTQueryCustomerService/customer/query?';

        $request = new RestRequest($url, 'POST');
        $request->buildPostBody($_POST);
        $request->execute();
    }
    if (isset($request)){
        if ($request->getStatus()==200) echo $request->getData();
        else  http_response_code($request->getStatus());
    }


    exit();
}

//echo '<pre>' . print_r($request, true) . '</pre>';