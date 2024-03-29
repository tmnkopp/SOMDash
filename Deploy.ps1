# ng build --configuration=production
cd C:\Users\Tim\source\repos\somuing\
ng build --configuration=production
ng serve
$base = 'C:\inetpub\wwwroot\'
$builds = $base + 'builds\' 
$releasefrom = "C:\Users\Tim\source\repos\somuing\dist\somuing\"
$releaseto = $base + "som\"
$temp = $base + "temp\"
 
$build_dest = $builds + 'somngui' + "-" + $(Get-Date -format 'MM-dd-yyyy-HH-mm-ss') 

Copy-Item -Path ($releasefrom) -Destination ($build_dest) -Recurse
Remove-item ( $temp + "*" ) -recurse -force
Copy-Item -Path ($releaseto + "*config" ) -Destination ($temp) 
Copy-Item -Path ($releaseto + "*appsettings*" ) -Destination ($temp)  
$HasFiles = Test-Path -Path $releasefrom* 
if( $HasFiles )
{
    Remove-item ( $releaseto + "*" ) -recurse -force
    Copy-Item   -Path ($releasefrom + "*") -Destination (  $releaseto ) -recurse  -force
    Copy-Item   -Path ($temp + "*") -Destination (  $releaseto ) -recurse  -force  
} 