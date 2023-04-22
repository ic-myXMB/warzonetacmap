# warzonetacmap


Primarily this simple project was started for only one reason as follows:

I play Warzone and as such I am a very big fan of the features of the maps created by: Andrei 'tuesandt' Zhuk @ https://warzonetacmap.online, but, as my internet connection where my computers are connected currenty is often on the flux due to the area I am currently in having heavy storms and other such interferences for connectivity, I wanted to be able to use that existing online map(s) but as an offline variant via my localhost, thus this project was started to simply edit the existing maps to be able to be used on my localhost. As such, some minor changes / edits  were required.

For simple example: 

- the existing maps were setup to be in primary htdocs or public_html dir only as such is how the site is setup and I wanted them to be in a folder within my localhost primary directory instead, ie: htdocs/warzonetacmap

- There are alot of external linked files like css, js, fonts etc, etc in the existing maps and that won't do for an offline viewing option, thus all those files needed to be included internally with the project. As such a bit of the linkages within source are changed.

- While I kept most hyperlink linkages existing, there were a few that needed to be changed as to not link to the site when selecting the diff maps, but besides that I tried to keep all other existing linkages intact as such suited my purposes while still keeping the majority of this as it was original.

- While using the maps both either on the online site in the past and or while using my offline variant initially I personally desired to see a legend on the map so as to know the icons easily especially say when viewing the map and having the menu closed and as such while I was making the minor changes on the 1.6.3 variant I opted to add legends to the maps for my offline localhost usages. I also then added such to the pre-existing archived 1.6.2 variant. Now done also on 1.7.0 variant. Now done also on 1.8.3 variant.


Note: 

The initial project was done using: "1.6.2 Feb 21st Version" as that was the available version at time of starting this rather quick and simple project and while Andrei 'tuesandt' Zhuk just updated the site today on the 24th of Feb to "1.6.3", and as such as soon as my free time allowed, I did the same edits but now on the "1.6.3" version so as to have the current version available for offline localhost usages. Now done also on 1.7.0 variant. Now done also on 1.8.3 variant.


Localhost Usage:


For this project I quickly used an existing Bitnami MAMP stack I had installed for example:

Bitnami MAMP 8.1.6 Rev 0

From: https://bitnami.com/

Though, in reality you could most likely use whatever existing localhost dev environment server you may have already in usage that suits your needs....


File Placement:


Within the repository there is a dir called: "warzonetacmap", that you would place in your primary dir for example: "htdocs/warzonetacmap"
 
And visit in your browser via your localhost for example:

localhost:8080/warzonetacmap/


Simple enough right?! And that is it!
