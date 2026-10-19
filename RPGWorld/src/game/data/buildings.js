// for the birds eye view map
// information of buildings on campus in regards to their location, name, and building type

const buildings = [
  {
  id: "brevard",

  name: "Brevard Hall",

  type: "dorm",

  position: {
    x: 1085,
    y: 760
  },

  size: {
    width: 133,
    height: 125
  },

  image: "brevard",

  // for future use

  //interaction: {
    //enterable: true,
    //questLocation: true
  //}
},

{
  id: "austin",

  name: "Austin Hall",

  type: "dorm",

  position: {
    x: 1165,
    y: 900
  },

  size: {
    width: 57,
    height: 147
  },

  image: "austin",

},

{
  id: "vaughn",

  name: "Vaughn Center",

  type: "dorm",

  position: {
    x: 1200,
    y: 744
  },

  size: {
    width: 121,
    height: 197
  },

  image: "vaughn",
},

{
  id: "dickey",

  name: "Health and Wellness Center",

  type: "medical",

  position: {
    x: 1100,
    y: 944
  },

  size: {
    width: 58,
    height: 58
  },

  image: "healthCenter",
},

{
  id: "palm",

  name: "Palm Apartments",

  type: "dorm",

  position: {
    x: 900,
    y: 735
  },

  size: {
    width: 155,
    height: 162
  },

  image: "palm",
  
},
{
  id: "mackechnie",

  name: "MacKechnie Building",

  type: "academic",

  position: {
    x: 1016,
    y: 975
  },

  size: {
    width: 52,
    height: 85
  },

  image: "mackechnie",
},
{
  id: "jenkins",

  name: "Jenkins Hall",

  type: "dorm",

  position: {
    x: 904,
    y: 875
  },

  size: {
    width: 98,
    height: 177
  },

  image: "jenkinsHall",
},

{
  id: "chapel",

  name: "Sykes Chapel and Center for Faith",

  type: "religious",

  position: {
    x: 1100,
    y: 700
  },

  size: {
    width: 106,
    height: 56
  },

  image: "chapel",
},

{
  id: "collegeofbusiness",

  name: "Sykes College of Business",

  type: "academic",

  position: {
    x: 1200,
    y: 480
  },

  size: {
    width: 116,
    height: 200
  },
  
  image: "sykesCOB",
},

{
  id: "smiley",

  name: "Smiley Hall",

  type: "academic",

  position: {
    x: 1310,
    y: 575
  },

  size: {
    width: 104,
    height: 144
  },

  image: "smiley",
},
{
  id: "plant",

  name: "Plant Hall",

  type: "multi-purpose",

  position: {
    x: 1350,
    y: 375
  },

  size: {
    width: 223,
    height: 491
  },

  image: "plant",
},
{
  id: "mckay",

  name: "McKay Hall",

  type: "dorm",

  position: {
    x: 1500,
    y: 350
  },

  size: {
    width: 151,
    height: 206
  },

  image: "mckay",
},
{
  id: "sfb",

  name: "Southard Family Building",

  type: "academic",

  position: {
    x: 1801,
    y: 348
  },

  size: {
    width: 140,
    height: 100
  },
},
{
  id: "mail",

  name: "Mail Services",

  type: "services",

  position: {
    x: 1814,
    y: 396
  },

  size: {
    width: 140,
    height: 100
  },
},

{
  id: "library",

  name: "Macdonald-Kelce Library",

  type: "services",

  position: {
    x: 1464,
    y: 120
  },

  size: {
    width: 140,
    height: 100
  },
},

{
  id: "straz",

  name: "Straz Hall",

  type: "dorm",

  position: {
    x: 716,
    y: 124
  },

  size: {
    width: 57,
    height: 178
  },

  image: "straz",
},
{
  id: "pepin",

  name: "Pepin Stadium",

  type: "athletic",

  position: {
    x: 746,
    y: 272
  },

  size: {
    width: 140,
    height: 100
  },
},
{
  id: "fit",

  name: "Benson Alex Riseman Fitness and Recreation Center",

  type: "athletic",

  position: {
    x: 851,
    y: 650
  },

  size: {
    width: 140,
    height: 100
  },
},
{
  id: "pool",

  name: "Benson Alex Riseman Aquatic Center",

  type: "athletic",

  position: {
    x: 955,
    y: 650
  },

  size: {
    width: 140,
    height: 100
  },
},
{
  id: "ferman",

  name: "Ferman Arts Center",

  type: "arts",

  position: {
    x: 584,
    y: 745
  },

  size: {
    width: 140,
    height: 100
  },
},
{
  id: "icb",

  name: "Daly Innovation and Collaboration Building",

  type: "academic",

  position: {
    x: 730,
    y: 860
  },

  size: {
    width: 127,
    height: 127
  },

  image: "ICB",
},
{
  id: "BAS",

  name: "Bailey Arts Studio",

  type: "arts",

  position: {
    x: 550,
    y: 584
  },

  size: {
    width: 140,
    height: 100
  },
},
{
  id: "SAS",

  name: "Sword and Sheild Room",

  type: "show",

  position: {
    x: 590,
    y: 497
  },

  size: {
    width: 140,
    height: 100
  },
},

{
  id: "HSHP",

  name: "Health Sciences and Human Performance Center",

  type: "show",

  position: {
    x: 570,
    y: 410
  },

  size: {
    width: 140,
    height: 100
  },
},

{
  id: "TECH",

  name: "Health and Technology Building - Technology",

  type: "academic",

  position: {
    x: 1026,
    y: 450
  },

  size: {
    width: 56,
    height: 234
  },

  image: "jenkinsHealthTech",
},

{
  id: "morsani",

  name: "Morsani Hall",

  type: "dorm",

  position: {
    x: 1000,
    y: 250
  },

  size: {
    width: 93,
    height: 210
  },

  image: "morsani",
}




];

export default buildings;