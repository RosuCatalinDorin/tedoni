<?php

/// VERIFICA USERUL

function getADGroupsFor($username){
	$ldap['server'] = "ads01cj001.bt.wan";
	$ldap['user'] 	= "incidente@bt.wan";
	$ldap['pass']   = "@1nc1d3nt3";
	$ldap['search'] = $username;
	$ldap['base']	= "OU=Centrala-Cluj,DC=BT,DC=WAN";

	$ds=ldap_connect($ldap['server']);
	if ($ds) {
		if (($ldap['user']!="") && ($ldap['pass']!=""))
			$r=ldap_bind($ds,$ldap['user'],$ldap['pass']);
		else
			$r=ldap_bind($ds);
		$sr=ldap_search($ds, "{$ldap['base']}", "samaccountname={$ldap['search']}");
		$info = ldap_get_entries($ds, $sr);
	if (is_array($info[0]['memberof'])){
		$groups = $info[0]['memberof'];
		   for($i=0;$i<$groups['count'];$i++){
				preg_match('/CN=(.*?),OU=/i',$groups[$i],$gr);
				$g[]=$gr[1];
			}
		ldap_close($ds);
		return $g;
	}else{
 		ldap_close($ds);

	 
	 //////////////////////////////////////////////////////////////

	$ldap['base']	= "OU=CR Vest,DC=BT,DC=WAN";

	$ds=ldap_connect($ldap['server']);
	if ($ds) {
		if (($ldap['user']!="") && ($ldap['pass']!=""))
			$r=ldap_bind($ds,$ldap['user'],$ldap['pass']);
		else
			$r=ldap_bind($ds);
		$sr=ldap_search($ds, "{$ldap['base']}", "samaccountname={$ldap['search']}");
		$info = ldap_get_entries($ds, $sr);
	if (is_array($info[0]['memberof'])){
		$groups = $info[0]['memberof'];
		   for($i=0;$i<$groups['count'];$i++){
				preg_match('/CN=(.*?),OU=/i',$groups[$i],$gr);
				$g[]=$gr[1];
			}
		ldap_close($ds);
		return $g;
	}else{
		ldap_close($ds);
		
//////////////////////////////////////////		
		
			$ldap['base']	= "OU=Bucuresti,DC=BT,DC=WAN";

			$ds=ldap_connect($ldap['server']);
			if ($ds) {
				if (($ldap['user']!="") && ($ldap['pass']!=""))
					$r=ldap_bind($ds,$ldap['user'],$ldap['pass']);
				else
					$r=ldap_bind($ds);
				$sr=ldap_search($ds, "{$ldap['base']}", "samaccountname={$ldap['search']}");
				$info = ldap_get_entries($ds, $sr);
			if (is_array($info[0]['memberof'])){
				$groups = $info[0]['memberof'];
				   for($i=0;$i<$groups['count'];$i++){
						preg_match('/CN=(.*?),OU=/i',$groups[$i],$gr);
						$g[]=$gr[1];
					}
				ldap_close($ds);
				return $g;
			}else{
				ldap_close($ds);
				
//////////////////////////////////////////				
				
					$ldap['base']	= "OU=CR Est,DC=BT,DC=WAN";

					$ds=ldap_connect($ldap['server']);
					if ($ds) {
						if (($ldap['user']!="") && ($ldap['pass']!=""))
							$r=ldap_bind($ds,$ldap['user'],$ldap['pass']);
						else
							$r=ldap_bind($ds);
						$sr=ldap_search($ds, "{$ldap['base']}", "samaccountname={$ldap['search']}");
						$info = ldap_get_entries($ds, $sr);
					if (is_array($info[0]['memberof'])){
						$groups = $info[0]['memberof'];
						   for($i=0;$i<$groups['count'];$i++){
								preg_match('/CN=(.*?),OU=/i',$groups[$i],$gr);
								$g[]=$gr[1];
							}
						ldap_close($ds);
						return $g;
					}else{
						ldap_close($ds);
						
//////////////////////////////////////////				
				
					$ldap['base']	= "OU=Italia,DC=BT,DC=WAN";

					$ds=ldap_connect($ldap['server']);
					if ($ds) {
						if (($ldap['user']!="") && ($ldap['pass']!=""))
							$r=ldap_bind($ds,$ldap['user'],$ldap['pass']);
						else
							$r=ldap_bind($ds);
						$sr=ldap_search($ds, "{$ldap['base']}", "samaccountname={$ldap['search']}");
						$info = ldap_get_entries($ds, $sr);
					if (is_array($info[0]['memberof'])){
						$groups = $info[0]['memberof'];
						   for($i=0;$i<$groups['count'];$i++){
								preg_match('/CN=(.*?),OU=/i',$groups[$i],$gr);
								$g[]=$gr[1];
							}
						ldap_close($ds);
						return $g;
					}

                    else return false;

					}else
						return false;

//				return false;
			}
			}else
				return false;
		
//		return false;
	}
	}else
		return false;
//		return false;
	}
	}else
		return false;
	 
	 
//		return false;
	}
	}else
		return false;

}
function get_users_company($username){
	
   $ad = ldap_connect("ads01cj001.bt.wan");
   //Set some variables
   ldap_set_option($ad, LDAP_OPT_PROTOCOL_VERSION, 3);
   ldap_set_option($ad, LDAP_OPT_REFERRALS, 0);
   
   //Bind to the ldap directory
   $bd = ldap_bind($ad,"incidente@bt.wan","@1nc1d3nt3")
       or die("Couldn't bind to AD!");

   //Search the directory
   $result = ldap_search($ad, "DC=BT,DC=WAN", "(sAMAccountName=$username)");//OU=Centrala-Cluj,
   $entries = ldap_get_entries($ad, $result);
/*
   if($entries["count"]==0){
	   $result = ldap_search($ad, "OU=CR Vest,DC=BT,DC=WAN", "(sAMAccountName=$username)");
	   $entries = ldap_get_entries($ad, $result);
	   if($entries["count"]==0){
		   $result = ldap_search($ad, "OU=CR Sud,DC=BT,DC=WAN", "(sAMAccountName=$username)");
		   $entries = ldap_get_entries($ad, $result);
		   if($entries["count"]==0){
			   $result = ldap_search($ad, "OU=CR Est,DC=BT,DC=WAN", "(sAMAccountName=$username)");
			   $entries = ldap_get_entries($ad, $result);
			   if($entries["count"]==0){
				   $result = ldap_search($ad, "OU=Bucuresti,DC=BT,DC=WAN", "(sAMAccountName=$username)");
				   $entries = ldap_get_entries($ad, $result);
				   if($entries["count"]==0){
				   $result = ldap_search($ad, "OU=BT Asset Management,DC=BT,DC=WAN", "(sAMAccountName=$username)");
				   $entries = ldap_get_entries($ad, $result);
				   }
				}
			}
		}
   }
   */
   //Sort and print
//   echo "User count: " . $entries["count"] . "<br /><br /><b>Users:</b><br />";

   for ($i=0; $i < $entries["count"]; $i++)
   {
//       echo $entries[$i]["company"][0]."<br/>";
       $ucs=$entries[$i]["division"][0];
   }
   //never forget to unbind!
   ldap_unbind($ad);

	$ucs=substr($ucs,0,8);
	return $ucs;
	
}
function get_users_titel($username){
    
   $ad = ldap_connect("ads01cj001.bt.wan");
   //Set some variables
   ldap_set_option($ad, LDAP_OPT_PROTOCOL_VERSION, 3);
   ldap_set_option($ad, LDAP_OPT_REFERRALS, 0);
   
   //Bind to the ldap directory
   $bd = ldap_bind($ad,"incidente@bt.wan","@1nc1d3nt3")
       or die("Couldn't bind to AD!");

   //Search the directory
   $result = ldap_search($ad, "OU=Centrala-Cluj,DC=BT,DC=WAN", "(sAMAccountName=$username)");
   $entries = ldap_get_entries($ad, $result);

   if($entries["count"]==0){
       $result = ldap_search($ad, "OU=CR Vest,DC=BT,DC=WAN", "(sAMAccountName=$username)");
       $entries = ldap_get_entries($ad, $result);
       if($entries["count"]==0){
           $result = ldap_search($ad, "OU=Italia,DC=BT,DC=WAN", "(sAMAccountName=$username)");
           $entries = ldap_get_entries($ad, $result);
           if($entries["count"]==0){
               $result = ldap_search($ad, "OU=CR Est,DC=BT,DC=WAN", "(sAMAccountName=$username)");
               $entries = ldap_get_entries($ad, $result);
               if($entries["count"]==0){
                   $result = ldap_search($ad, "OU=Bucuresti,DC=BT,DC=WAN", "(sAMAccountName=$username)");
                   $entries = ldap_get_entries($ad, $result);
                   if($entries["count"]==0){
                   $result = ldap_search($ad, "OU=BT Asset Management,DC=BT,DC=WAN", "(sAMAccountName=$username)");
                   $entries = ldap_get_entries($ad, $result);
                   }
                }
            }
        }
   }
      
   //Sort and print
//   echo "User count: " . $entries["count"] . "<br /><br /><b>Users:</b><br />";

   for ($i=0; $i < $entries["count"]; $i++)
   {
//       echo $entries[$i]["company"][0]."<br/>";
       $ucs=$entries[$i]["title"][0];
   }
   //never forget to unbind!
   ldap_unbind($ad);

    $ucs=substr($ucs,0,8);
    return $ucs;
    
}
function get_user_display_name($username){
	
   $ad = ldap_connect("ads01cj001.bt.wan");
   //Set some variables
   ldap_set_option($ad, LDAP_OPT_PROTOCOL_VERSION, 3);
   ldap_set_option($ad, LDAP_OPT_REFERRALS, 0);
   
   //Bind to the ldap directory
   $bd = ldap_bind($ad,"incidente@bt.wan","@1nc1d3nt3")
       or die("Couldn't bind to AD!");

   //Search the directory
   $result = ldap_search($ad, "OU=Centrala-Cluj,DC=BT,DC=WAN", "(sAMAccountName=$username)");
   $entries = ldap_get_entries($ad, $result);

   if($entries["count"]==0){
	   $result = ldap_search($ad, "OU=CR Vest,DC=BT,DC=WAN", "(sAMAccountName=$username)");
	   $entries = ldap_get_entries($ad, $result);
	   if($entries["count"]==0){
		   $result = ldap_search($ad, "OU=Italia,DC=BT,DC=WAN", "(sAMAccountName=$username)");
		   $entries = ldap_get_entries($ad, $result);
		   if($entries["count"]==0){
			   $result = ldap_search($ad, "OU=CR Est,DC=BT,DC=WAN", "(sAMAccountName=$username)");
			   $entries = ldap_get_entries($ad, $result);
			   if($entries["count"]==0){
				   $result = ldap_search($ad, "OU=Bucuresti,DC=BT,DC=WAN", "(sAMAccountName=$username)");
				   $entries = ldap_get_entries($ad, $result);
					if($entries["count"]==0){
				   $result = ldap_search($ad, "OU=BT Asset Management,DC=BT,DC=WAN", "(sAMAccountName=$username)");
				   $entries = ldap_get_entries($ad, $result);
					}
				}
			}
		}
   }
      
   //Sort and print
  //echo "User count: " . $entries["count"] . "<br /><br /><b>Users:</b><br />";

   for ($i=0; $i < $entries["count"]; $i++)
   {
//       echo $entries[$i]["company"][0]."<br/>";
         $ucs=$entries[$i]["cn"][0];
   }
   //never forget to unbind!
   ldap_unbind($ad);
    $rez[entrys]=$entries["count"];
	$rez[user]=$ucs;
	return $rez;
	
}
function check_user($luser,$lpass,$ans){

	$ok="Y";

	$ch_user=$luser;
	$ch_pass=$lpass;
	
	$lunuser=strlen($ch_user);
	$lunpass=strlen($ch_pass);
	if($lunpass<1){
		$ok="N";
		$mesaj_login="Parola nu poate fi blank!";
	}
	if($lunuser<1){
		$ok="N";
		$mesaj_login="Userul nu poate fi blank!";
	}
	
	if($ok=="Y"){
		$ch_user=$ch_user."@bt.wan";
	    //$dn = "OU=CR Vest,DC=BT,DC=WAN";
		$dn = "DC=BT,DC=WAN";
		$ad = ldap_connect("ldap://ads01cj001.bt.wan") or die("Couldn't connect to AD!");
		$ldapbind = ldap_bind($ad, $ch_user, $ch_pass);
			
		if ($ldapbind==1){
			$mesaj_login="Userul e in AD";
		}
		else {
			$mesaj_login="User sau parola incorecte!";
			$ok="N";
		}
	} /// ENDIF OK=Y


if($ans==1){
	$rsp=$ok;
}
else{
	if($ans==2){
		$rsp=$mesaj_login;
	}
}

return $rsp;
}
function get_ad_user_details($username,$all=false){
   $ad = ldap_connect("ads01cj001.bt.wan");
   //Set some variables
   ldap_set_option($ad, LDAP_OPT_PROTOCOL_VERSION, 3);
   ldap_set_option($ad, LDAP_OPT_REFERRALS, 0);
   
   //Bind to the ldap directory
   $bd = ldap_bind($ad,"incidente@bt.wan","@1nc1d3nt3")
       or die("Couldn't bind to AD!");

   //Search the directory
   $result = ldap_search($ad, "DC=BT,DC=WAN", "(sAMAccountName=$username)");
   $entries = ldap_get_entries($ad, $result);
   /*
   if($entries["count"]==0){
       $result = ldap_search($ad, "OU=CR Vest,DC=BT,DC=WAN", "(sAMAccountName=$username)");
       $entries = ldap_get_entries($ad, $result);
       if($entries["count"]==0){
           $result = ldap_search($ad, "OU=CR Sud,DC=BT,DC=WAN", "(sAMAccountName=$username)");
           $entries = ldap_get_entries($ad, $result);
           if($entries["count"]==0){
               $result = ldap_search($ad, "OU=CR Est,DC=BT,DC=WAN", "(sAMAccountName=$username)");
               $entries = ldap_get_entries($ad, $result);
               if($entries["count"]==0){
                   $result = ldap_search($ad, "OU=Bucuresti,DC=BT,DC=WAN", "(sAMAccountName=$username)");
                   $entries = ldap_get_entries($ad, $result);
                    if($entries["count"]==0){
                   $result = ldap_search($ad, "OU=BT Asset Management,DC=BT,DC=WAN", "(sAMAccountName=$username)");
                   $entries = ldap_get_entries($ad, $result);
                    }
                }
            }
        }
   }
*/
   $result=array();
   $result['count']=$entries['count'];
   for ($i=0; $i < $entries["count"]; $i++)
   {


       $result[$i]=array();
        if (!$all){
            $result[$i]['nume']=$entries[$i]["cn"][0];
            $result[$i]['functie']=$entries[$i]["title"][0];
            $result[$i]['division']=$entries[$i]["division"][0];
            $result[$i]['mail']=$entries[$i]["mail"][0];
            $manager=explode(",",$entries[$i]["manager"][0]);
            $manager=explode("=",$manager[0]);
            $result[$i]['manager']=utf8_decode($manager[1]);
            $result[$i]['division_name']=$entries[$i]["physicaldeliveryofficename"][0];
        }
        else $result[$i]=$entries[$i];

   }
   ldap_unbind($ad);
   // print_r($result);
   // echo "<Br>------------------------------------<br>";
   return $result;
    
}
function get_group_members($grup){
    $ad = ldap_connect("ads01cj001.bt.wan");
    //Set some variables
    ldap_set_option($ad, LDAP_OPT_PROTOCOL_VERSION, 3);
    ldap_set_option($ad, LDAP_OPT_REFERRALS, 0);

    //Bind to the ldap directory
    $bd = ldap_bind($ad,"incidente@bt.wan","@1nc1d3nt3")
    or die("Couldn't bind to AD!");

    //Search the directory
    $filter="(&(objectClass=user)(objectCategory=person)(|(memberof=CN=$grup,OU=MailGroups,DC=BT,DC=WAN)(memberof=CN=$grup,OU=Bucuresti,DC=BT,DC=WAN)))";
    //echo $filter;
    //echo '<br>';
    $result = ldap_search($ad, "DC=BT,DC=WAN", $filter);
    $entries = ldap_get_entries($ad, $result);
    $res=array();
    foreach ($entries as $p){
        if (trim($p['samaccountname'][0])!=''){
            $us=array('username'=>$p['samaccountname'][0],'name'=>$p['cn'][0]);
            $res[]=$us;
        }

    }
    return $res;
}

?>