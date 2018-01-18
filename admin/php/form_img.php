<?php
/**
 * Created by PhpStorm.
 * User: Paul.Sas
 * Date: 02/09/2017
 * Time: 1:48 PM
 */
function xml2array($contents, $get_attributes=1, $priority = 'tag') {
    if(!$contents) return array();

    if(!function_exists('xml_parser_create')) {
        //print "'xml_parser_create()' function not found!";
        return array();
    }

    //Get the XML parser of PHP - PHP must have this module for the parser to work
    $parser = xml_parser_create('');
    xml_parser_set_option($parser, XML_OPTION_TARGET_ENCODING, "UTF-8"); # http://minutillo.com/steve/weblog/2004/6/17/php-xml-and-character-encodings-a-tale-of-sadness-rage-and-data-loss
    xml_parser_set_option($parser, XML_OPTION_CASE_FOLDING, 0);
    xml_parser_set_option($parser, XML_OPTION_SKIP_WHITE, 1);
    xml_parse_into_struct($parser, trim($contents), $xml_values);
    xml_parser_free($parser);

    if(!$xml_values) return;//Hmm...

    //Initializations
    $xml_array = array();
    $parents = array();
    $opened_tags = array();
    $arr = array();

    $current = &$xml_array; //Refference

    //Go through the tags.
    $repeated_tag_index = array();//Multiple tags with same name will be turned into an array
    foreach($xml_values as $data) {
        unset($attributes,$value);//Remove existing values, or there will be trouble

        //This command will extract these variables into the foreach scope
        // tag(string), type(string), level(int), attributes(array).
        extract($data);//We could use the array by itself, but this cooler.

        $result = array();
        $attributes_data = array();

        if(isset($value)) {
            if($priority == 'tag') $result = $value;
            else $result['value'] = $value; //Put the value in a assoc array if we are in the 'Attribute' mode
        }

        //Set the attributes too.
        if(isset($attributes) and $get_attributes) {
            foreach($attributes as $attr => $val) {
                if($priority == 'tag') $attributes_data[$attr] = $val;
                else $result['attr'][$attr] = $val; //Set all the attributes in a array called 'attr'
            }
        }

        //See tag status and do the needed.
        if($type == "open") {//The starting of the tag '<tag>'
            $parent[$level-1] = &$current;
            if(!is_array($current) or (!in_array($tag, array_keys($current)))) { //Insert New tag
                $current[$tag] = $result;
                if($attributes_data) $current[$tag. '_attr'] = $attributes_data;
                $repeated_tag_index[$tag.'_'.$level] = 1;

                $current = &$current[$tag];

            } else { //There was another element with the same tag name

                if(isset($current[$tag][0])) {//If there is a 0th element it is already an array
                    $current[$tag][$repeated_tag_index[$tag.'_'.$level]] = $result;
                    $repeated_tag_index[$tag.'_'.$level]++;
                } else {//This section will make the value an array if multiple tags with the same name appear together
                    $current[$tag] = array($current[$tag],$result);//This will combine the existing item and the new item together to make an array
                    $repeated_tag_index[$tag.'_'.$level] = 2;

                    if(isset($current[$tag.'_attr'])) { //The attribute of the last(0th) tag must be moved as well
                        $current[$tag]['0_attr'] = $current[$tag.'_attr'];
                        unset($current[$tag.'_attr']);
                    }

                }
                $last_item_index = $repeated_tag_index[$tag.'_'.$level]-1;
                $current = &$current[$tag][$last_item_index];
            }

        } elseif($type == "complete") { //Tags that ends in 1 line '<tag />'
            //See if the key is already taken.
            if(!isset($current[$tag])) { //New Key
                $current[$tag] = $result;
                $repeated_tag_index[$tag.'_'.$level] = 1;
                if($priority == 'tag' and $attributes_data) $current[$tag. '_attr'] = $attributes_data;

            } else { //If taken, put all things inside a list(array)
                if(isset($current[$tag][0]) and is_array($current[$tag])) {//If it is already an array...

                    // ...push the new element into that array.
                    $current[$tag][$repeated_tag_index[$tag.'_'.$level]] = $result;

                    if($priority == 'tag' and $get_attributes and $attributes_data) {
                        $current[$tag][$repeated_tag_index[$tag.'_'.$level] . '_attr'] = $attributes_data;
                    }
                    $repeated_tag_index[$tag.'_'.$level]++;

                } else { //If it is not an array...
                    $current[$tag] = array($current[$tag],$result); //...Make it an array using using the existing value and the new value
                    $repeated_tag_index[$tag.'_'.$level] = 1;
                    if($priority == 'tag' and $get_attributes) {
                        if(isset($current[$tag.'_attr'])) { //The attribute of the last(0th) tag must be moved as well

                            $current[$tag]['0_attr'] = $current[$tag.'_attr'];
                            unset($current[$tag.'_attr']);
                        }

                        if($attributes_data) {
                            $current[$tag][$repeated_tag_index[$tag.'_'.$level] . '_attr'] = $attributes_data;
                        }
                    }
                    $repeated_tag_index[$tag.'_'.$level]++; //0 and 1 index is already taken
                }
            }

        } elseif($type == 'close') { //End of tag '</tag>'
            $current = &$parent[$level-1];
        }
    }

    return($xml_array);
}
error_reporting(0);
if ($_REQUEST['action']=='loadImage' && $_REQUEST['itemId']=='reprezentant_photo'){
    $data=array();
    parse_str($_REQUEST['itemValue'], $data);
    //echo '<pre>'. print_r($data, true).'</pre>';

    $username = 'ce.app';
    $password = 'Cl13ntEnr@llment';
//echo 'aaaaaaaaaa';
    $ch = curl_init();
    $url=$url='http://btclient/sites/mainsite/_vti_bin/BT.iQuest.ClientEnrollment/SignatureClient.svc/web/Get'.$data['type'].'/'.$data['cif'];
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_NTLM);
    curl_setopt($ch, CURLOPT_USERPWD, "$username:$password") ;

    $file=curl_exec($ch);
    $file_data=xml2array($file);
    $file_data=$file_data['Client']['Beneficiaries']['Beneficiary'];
    if (!$file_data['CIF']){
        foreach($file_data as $v){
            if ($v['CIF']==$data['cif_im']){
                $img=$v[Signature];
                if ($img[Binary]=='' ){
                    $img[Binary]='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';
                    $img[Type]='jpg';
                }
                Header("Content-Type: image/$img[Type]");
                echo base64_decode($img[Binary]);
            }

        }
    }
    else{
        $v=$file_data;
        $img=$v[Signature];
        if ($img[Binary]=='' ){
            $img[Binary]='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';
            $img[Type]='jpg';
        }
        Header("Content-Type: image/$img[Type]");
        echo base64_decode($img[Binary]);
    }


}