<!-- This content will not appear in the rendered Markdown -->

# Title

## Second Title

### Third Title

#### Forth title

##### Fifth title

###### Sixth title

This is an example of link to [Hyde](https://git.danbtw.org/skirex/Hyde) repository

Lorem ipsum dolor sit amet, consectetur adipiscing elit

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium


Line 1
Line 2\
Line 3

`Code block 1`
``Code block 2``
```Code block 3```

`Code block alpha` `Code block beta`

```
multiline
code
block
```

<!-- 
This 
content 
will 
not 
appear 
in 
the 
rendered 
Markdown 
-->

**Example of bold text**


__This Text is italic__

_This Text is also italic_

~~There is a line going over this text~~

This line is loading a css file @[hacker.css]

This line sets the website icon #[favicon.ico]

# Image example bellow

![Hyde logo](hyde.png)

# Bellow you can see an example of JSON web parser

<#==
{
    "username":"Daniel",

    "description":{
        "location": "Czech Republic",
        "field": "Information Technology",
        "activeProjects": "Hyde and Yukon",
        "coreStack": "Python, JavaScript and C",
        "languages": "Czech and English"
    },

    "contacts":{
        "email": "contact@danbtw.org",
        "discord": "skirex"
    },

    "websiteLinks":{
        "NumScript": "https://numscript.danbtw.org",
        "Mytharis": "https://mytharis.danbtw.org",
        "Club Penguin": "https://cpps.danbtw.org",
        "SnakeJS": "https://snakejs.danbtw.org",
        "Git": "https://git.danbtw.org"
    },

    "gameServers":{
        "EagleCraft": "wss://valhalla.danbtw.org"
    }
}
===>

# And some scripts too

My name is $[name]

My age is $[age]

<!==
main [
    let('name', 'Daniel'),
    let('age', 19)
]
===>

<!==
main [
    let('date', datetime()),
    print('This is the current date: ${datetime}')
]
===>

<!==
main [
    let('s', getSecond()),
    let('m', getMinute()),
    let('h', getHour()),

    if (let('m', '0${m}'), none(), lt(m, 10)),
    if (let('s', '0${s}'), none(), lt(s, 10)),

    print('Current time: ${h}:${m}:${s}')
]
===>