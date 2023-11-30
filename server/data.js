
//-------------------------------------------------------------------------------------

//DATA HAS BEEN INSERTED, NO NEED TO RE RUN THIS FUNCTION

//-------------------------------------------------------------------------------------

const fs= require('fs');
const mysql = require('mysql'); 
const dotenv = require('dotenv').config({path:'server/.env'}); 
// dotenv.config({path:'server\\.env'});
// dotenv.config();

//creating a function to move the data from json files to the data base. 

function insertDB(){
    console.log("connecting to", process.env.DB_USERNAME, process.env.PASSWORD,process.env.DATABASE)
    //function that reads the data from JSON file
    const filepath = 'server\\superhero_info.json'
    const jsonData = JSON.parse(fs.readFileSync(filepath, 'utf-8'))


//setting up the MySQL connection
const connection = mysql.createConnection({
    host: process.env.HOST, 
    user: process.env.DB_USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT

    // host: process.env.HOST, 
    // user: 'herohub',
    // password: 'herohub3316',
    // database: process.env.DATABASE,
    // port: process.env.DB_PORT

}); 

connection.connect((err)=>{
    if(err){
        console.error('Error:',err);
        return;
    }

    //inserting that data into the connected database

    try{

        connection.query('USE ' +process.env.DATABASE); 
        for(const item of jsonData){

            //check if database is already populated
            const table = connection.query("SELECT id FROM superheroes WHERE id= ?", [item.id]);
            console.log(table[0])

                let query = "INSERT INTO superheroes (id,name,gender,eye_color,race,hair_color,height,publisher,skin_color,alignment,weight) VALUES(?)";

                let values = [
                    item.id,
                    item.name,
                    item.Gender,
                    item["Eye color"],
                    item.Race,
                    item["Hair color"],
                    item.Height,
                    item.Publisher,
                    item["Skin color"],
                    item.Alignment,
                    item.Weight,
            ];

            connection.query(query,[values], function(err,result){
                if(err) throw err;
                console.log("number of records inserted:" + result.affectedRows);

            });
            

            }
        

        console.log('Data inserted'); 
    }catch(error){
        console.error("error:", error);

    }finally{
        connection.end();
        }
    });


}
//DATA INSERTED
//insertDB();

function insertDBsuperpower(){
        console.log("connecting to", process.env.DB_USERNAME, process.env.PASSWORD,process.env.DATABASE)
        //function that reads the data from JSON file
        const filepath = 'server\\superhero_powers.json'
        const jsonData = JSON.parse(fs.readFileSync(filepath, 'utf-8'))

        const cols = Object.keys(jsonData);
        const vals = Object.values(jsonData);


    //setting up the MySQL connection
    const connection = mysql.createConnection({
        host: process.env.HOST, 
        user: process.env.DB_USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        port: process.env.DB_PORT

        // host: process.env.HOST, 
        // user: 'herohub',
        // password: 'herohub3316',
        // database: process.env.DATABASE,
        // port: process.env.DB_PORT

    }); 

    connection.connect((err)=>{
        if(err){
            console.error('Error:',err);
            return;
        }

        //inserting that data into the connected database

        try{

            connection.query('USE ' +process.env.DATABASE); 
     
            
                //check if database is already populated
                connection.query(`CREATE TABLE IF NOT EXISTS powers (
                    \`hero_names\` TEXT, 
                    Agility TEXT,
                    \`Accelerated Healing\` TEXT, 
                    \`Lantern Power Ring\` TEXT,
                     \`Dimensional Awareness\` TEXT, 
                \`Cold Resistance\` TEXT,
                 \`Durability\` TEXT, 
                \`Stealth\` TEXT, 
                \`Energy Absorption\` TEXT, 
                \`Flight\` TEXT, 
                \`Danger Sense\` TEXT, 
                \`Underwater breathing\` TEXT, 
                \`Marksmanship\` TEXT,
                \`Weapons Master\` TEXT,
                \`Power Augmentation\` TEXT,
                \`Animal Attributes\` TEXT,
                \`Longevity\` TEXT,
                 \`Intelligence\` TEXT,
                \`Super Strength\` TEXT, 
                \`Cryokinesis\` TEXT, 
                \`Telepathy\` TEXT,
                \`Energy Armor\` TEXT,
                \`Energy Blasts\` TEXT,
                \`Duplication\` TEXT, 
                \`Size Changing\` TEXT, 
                \`Density Control\` TEXT,
                \`Stamina\` TEXT, 
                \`Astral Travel\` TEXT,
                \`Audio Control\` TEXT, 
                \`Dexterity\` TEXT,
                \`Omnitrix\` TEXT, 
                \`Super Speed\` TEXT,
                \`Possession\` TEXT, 
                \`Animal Oriented Powers\` TEXT, 
                \`Weapon-based Powers\` TEXT,
                \`Electrokinesis\` TEXT, 
                \`Darkforce Manipulation\` TEXT, 
                \`Death Touch\` TEXT, 
                \`Teleportation\` TEXT, 
                \`Enhanced Senses\` TEXT, 
                \`Telekinesis\` TEXT, 
                \`Energy Beams\` TEXT, 
                \`Magic\` TEXT,
                \`Hyperkinesis\` TEXT,
                \`Jump\` TEXT, 
                \`Clairvoyance\` TEXT, 
                \`Dimensional Travel\` TEXT,
                \`Power Sense\` TEXT, 
                \`Shapeshifting\` TEXT,
                \`Peak Human Condition\` TEXT,
                \`Immortality\` TEXT,
                \`Camouflage\` TEXT, 
                \`Element Control\` TEXT,
                \`Phasing\` TEXT, 
                \`Astral Projection\` TEXT, 
                \`Electrical Transport\` TEXT,
                \`Fire Control\` TEXT, 
                \`Projection\` TEXT, 
                \`Summoning\` TEXT, 
                \`Enhanced Memory\` TEXT,
                \`Reflexes\` TEXT,
                \`Invulnerability\` TEXT, 
                \`Energy Constructs\` TEXT,
                \`Force Fields\` TEXT,
                \`Self-Sustenance\` TEXT,
                \`Anti-Gravity\` TEXT,
                \`Empathy\` TEXT, 
                \`Power Nullifier\` TEXT, 
                \`Radiation Control\` TEXT,
                \`Psionic Powers\` TEXT,
                \`Elasticity\` TEXT,
                \`Substance Secretion\` TEXT,
                \`Elemental Transmogrification\` TEXT, 
                \`Technopath/Cyberpath\` TEXT,
                \`Photographic Reflexes\` TEXT,
                \`Seismic Power\` TEXT,
                \`Animation\` TEXT, 
                \`Precognition\` TEXT, 
                \`Mind Control\` TEXT, 
                \`Fire Resistance\` TEXT,
                \`Power Absorption\` TEXT,
                \`Enhanced Hearing\` TEXT,
                \`Nova Force\` TEXT,
                \`Insanity\` TEXT,
                \`Hypnokinesis\` TEXT, 
                \`Animal Control\` TEXT,
                \`Natural Armor\` TEXT,
                \`Intangibility\` TEXT,
                \`Enhanced Sight\` TEXT, 
                \`Molecular Manipulation\` TEXT, 
                \`Heat Generation\` TEXT, 
                \`Adaptation\` TEXT, 
                \`Gliding\` TEXT,
                \`Power Suit\` TEXT,
                \`Mind Blast\` TEXT, 
                \`Probability Manipulation\` TEXT, 
                \`Gravity Control\` TEXT,
                \`Regeneration\` TEXT, 
                \`Light Control\` TEXT,
                \`Echolocation\` TEXT,
                \`Levitation\` TEXT, 
                \`Toxin and Disease Control\` TEXT, 
                \`Banish\` TEXT, 
                \`Energy Manipulation\` TEXT,
                \`Heat Resistance\` TEXT,
                \`Natural Weapons\` TEXT,
                \`Time Travel\` TEXT,
                \`Enhanced Smell\` TEXT, 
                \`Illusions\` TEXT,
                \`Thirstokinesis\` TEXT,
                \`Hair Manipulation\` TEXT,
                \`Illumination\` TEXT,
                \`Omnipotent\` TEXT,
                \`Cloaking\` TEXT, 
                \`Changing Armor\` TEXT,
                \`Power Cosmic\` TEXT, 
                \`Biokinesis\` TEXT,
                \`Water Control\` TEXT,
                \`Radiation Immunity\` TEXT,
                \`Vision - Telescopic\` TEXT, 
                \`Toxin and Disease Resistance\` TEXT,
                \`Spatial Awareness\` TEXT,
                \`Energy Resistance\` TEXT,
                \`Telepathy Resistance\` TEXT, 
                \`Molecular Combustion\` TEXT,
                \`Omnilingualism\` TEXT,
                \`Portal Creation\` TEXT,
                \`Magnetism\` TEXT,
                \`Mind Control Resistance\` TEXT, 
                \`Plant Control\` TEXT,
                \`Sonar\` TEXT,
                \`Sonic Scream\` TEXT,
                \`Time Manipulation\` TEXT,
                \`Enhanced Touch\` TEXT,
                \`Magic Resistance\` TEXT, 
                \`Invisibility\` TEXT,
                \`Sub-Mariner\` TEXT,
                \`Radiation Absorption\` TEXT,
                \`Intuitive aptitude\` TEXT,
                \`Vision - Microscopic\` TEXT, 
                \`Melting\` TEXT, 
                \`Wind Control\` TEXT,
                \`Super Breath\` TEXT,
                \`Wallcrawling\` TEXT, 
                \`Vision - Night\` TEXT,
                \`Vision - Infrared\` TEXT, 
                \`Grim Reaping\` TEXT, 
                \`Matter Absorption\` TEXT,
                \`The Force\` TEXT, 
                \`Resurrection\` TEXT, 
                \`Terrakinesis\` TEXT,
                \`Vision - Heat\` TEXT, 
                \`Vitakinesis\` TEXT,
                \`Radar Sense\` TEXT,
                \`Qwardian Power Ring\` TEXT,
                \`Weather Control\` TEXT,
                \`Vision - X-Ray\` TEXT,
                \`Vision - Thermal\` TEXT,
                \`Web Creation\` TEXT, 
                \`Reality Warping\` TEXT, 
                \`Odin Force\` TEXT,
                \`Symbiote Costume\` TEXT,
                \`Speed Force\` TEXT,
                \`Phoenix Force\` TEXT,
                \`Molecular Dissipation\` TEXT, 
                \`Vision - Cryo\` TEXT,
                \`Omnipresent\` TEXT,
                \`Omniscient\` TEXT) ENGINE = InnoDB ROW_FORMAT=DYNAMIC`, (err)=>{
                    if(err){
                        console.error("Error:",err);
                    }
                });

                for(const item of jsonData){

                    let query = 'INSERT INTO powers (hero_names, Agility, `Accelerated Healing`, `Lantern Power Ring`, `Dimensional Awareness`, ' +
                    '`Cold Resistance`, Durability, Stealth, `Energy Absorption`, Flight, `Danger Sense`, `Underwater breathing`, ' +
                    'Marksmanship, `Weapons Master`, `Power Augmentation`, `Animal Attributes`, Longevity, Intelligence, `Super Strength`, ' +
                    'Cryokinesis, Telepathy, `Energy Armor`, `Energy Blasts`, Duplication, `Size Changing`, `Density Control`, Stamina, ' +
                    '`Astral Travel`, `Audio Control`, Dexterity, Omnitrix, `Super Speed`, Possession, `Animal Oriented Powers`, ' +
                    '`Weapon-based Powers`, Electrokinesis, `Darkforce Manipulation`, `Death Touch`, Teleportation, `Enhanced Senses`, ' +
                    'Telekinesis, `Energy Beams`, Magic, `Hyperkinesis`, Jump, Clairvoyance, `Dimensional Travel`, `Power Sense`, ' +
                    'Shapeshifting, `Peak Human Condition`, Immortality, Camouflage, `Element Control`, Phasing, `Astral Projection`, ' +
                    '`Electrical Transport`, `Fire Control`, Projection, Summoning, `Enhanced Memory`, Reflexes, Invulnerability, ' +
                    '`Energy Constructs`, `Force Fields`, `Self-Sustenance`, `Anti-Gravity`, Empathy, `Power Nullifier`, ' +
                    '`Radiation Control`, `Psionic Powers`, Elasticity, `Substance Secretion`, `Elemental Transmogrification`, ' +
                    '`Technopath/Cyberpath`, `Photographic Reflexes`, `Seismic Power`, Animation, Precognition, `Mind Control`, ' +
                    '`Fire Resistance`, `Power Absorption`, `Enhanced Hearing`, `Nova Force`, Insanity, Hypnokinesis, ' +
                    '`Animal Control`, `Natural Armor`, `Intangibility`, `Enhanced Sight`, `Molecular Manipulation`, ' +
                    '`Heat Generation`, Adaptation, Gliding, `Power Suit`, `Mind Blast`, `Probability Manipulation`, ' +
                    '`Gravity Control`, Regeneration, `Light Control`, Echolocation, Levitation, `Toxin and Disease Control`, ' +
                    'Banish, `Energy Manipulation`, `Heat Resistance`, `Natural Weapons`, `Time Travel`, `Enhanced Smell`, Illusions, ' +
                    'Thirstokinesis, `Hair Manipulation`, `Illumination`, Omnipotent, Cloaking, `Changing Armor`, ' +
                    '`Power Cosmic`, Biokinesis, `Water Control`, `Radiation Immunity`, `Vision - Telescopic`, ' +
                    '`Toxin and Disease Resistance`, `Spatial Awareness`, `Energy Resistance`, `Telepathy Resistance`, ' +
                    '`Molecular Combustion`, `Omnilingualism`, `Portal Creation`, `Magnetism`, `Mind Control Resistance`, ' +
                    '`Plant Control`, Sonar, `Sonic Scream`, `Time Manipulation`, `Enhanced Touch`, `Magic Resistance`, ' +
                    'Invisibility, `Sub-Mariner`, `Radiation Absorption`, `Intuitive aptitude`, `Vision - Microscopic`, ' +
                    'Melting, `Wind Control`, `Super Breath`, Wallcrawling, `Vision - Night`, `Vision - Infrared`, ' +
                    '`Grim Reaping`, `Matter Absorption`, `The Force`, `Resurrection`, `Terrakinesis`, `Vision - Heat`, ' +
                    '`Vitakinesis`, `Radar Sense`, `Qwardian Power Ring`, `Weather Control`, `Vision - X-Ray`, `Vision - Thermal`, `Web Creation`, ' +
                    '`Reality Warping`, `Odin Force`, `Symbiote Costume`, `Speed Force`, `Phoenix Force`, `Molecular Dissipation`, ' +
                    '`Vision - Cryo`, `Omnipresent`, `Omniscient`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

                    connection.query(query, [item.hero_names, item.Agility, item['Accelerated Healing'], item['Lantern Power Ring'], item['Dimensional Awareness'],
                    item['Cold Resistance'], item['Durability'], item['Stealth'], item['Energy Absorption'], item['Flight'], item['Danger Sense'],
                    item['Underwater breathing'], item['Marksmanship'], item['Weapons Master'], item['Power Augmentation'], item['Animal Attributes'],
                    item['Longevity'], item['Intelligence'], item['Super Strength'], item['Cryokinesis'], item['Telepathy'], item['Energy Armor'],
                    item['Energy Blasts'], item['Duplication'], item['Size Changing'], item['Density Control'], item['Stamina'], item['Astral Travel'],
                    item['Audio Control'], item['Dexterity'], item['Omnitrix'], item['Super Speed'], item['Possession'], item['Animal Oriented Powers'],
                    item['Weapon-based Powers'], item['Electrokinesis'], item['Darkforce Manipulation'], item['Death Touch'], item['Teleportation'],
                    item['Enhanced Senses'], item['Telekinesis'], item['Energy Beams'], item['Magic'], item['Hyperkinesis'], item['Jump'],
                    item['Clairvoyance'], item['Dimensional Travel'], item['Power Sense'], item['Shapeshifting'], item['Peak Human Condition'],
                    item['Immortality'], item['Camouflage'], item['Element Control'], item['Phasing'], item['Astral Projection'], item['Electrical Transport'],
                    item['Fire Control'], item['Projection'], item['Summoning'], item['Enhanced Memory'], item['Reflexes'], item['Invulnerability'],
                    item['Energy Constructs'], item['Force Fields'], item['Self-Sustenance'], item['Anti-Gravity'], item['Empathy'], item['Power Nullifier'],
                    item['Radiation Control'], item['Psionic Powers'], item['Elasticity'], item['Substance Secretion'], item['Elemental Transmogrification'],
                    item['Technopath/Cyberpath'], item['Photographic Reflexes'], item['Seismic Power'], item['Animation'], item['Precognition'],
                    item['Mind Control'], item['Fire Resistance'], item['Power Absorption'], item['Enhanced Hearing'], item['Nova Force'], item['Insanity'],
                    item['Hypnokinesis'], item['Animal Control'], item['Natural Armor'], item['Intangibility'], item['Enhanced Sight'],
                    item['Molecular Manipulation'], item['Heat Generation'], item['Adaptation'], item['Gliding'], item['Power Suit'], item['Mind Blast'],
                    item['Probability Manipulation'], item['Gravity Control'], item['Regeneration'], item['Light Control'], item['Echolocation'],
                    item['Levitation'], item['Toxin and Disease Control'], item['Banish'], item['Energy Manipulation'], item['Heat Resistance'],
                    item['Natural Weapons'], item['Time Travel'], item['Enhanced Smell'], item['Illusions'], item['Thirstokinesis'], item['Hair Manipulation'],
                    item['Illumination'], item['Omnipotent'], item['Cloaking'], item['Changing Armor'], item['Power Cosmic'], item['Biokinesis'],
                    item['Water Control'], item['Radiation Immunity'], item['Vision - Telescopic'], item['Toxin and Disease Resistance'],
                    item['Spatial Awareness'], item['Energy Resistance'], item['Telepathy Resistance'], item['Molecular Combustion'],
                    item['Omnilingualism'], item['Portal Creation'], item['Magnetism'], item['Mind Control Resistance'], item['Plant Control'],
                    item['Sonar'], item['Sonic Scream'], item['Time Manipulation'], item['Enhanced Touch'], item['Magic Resistance'], item['Invisibility'],
                    item['Sub-Mariner'], item['Radiation Absorption'], item['Intuitive aptitude'], item['Vision - Microscopic'], item['Melting'],
                    item['Wind Control'], item['Super Breath'], item['Wallcrawling'], item['Vision - Night'], item['Vision - Infrared'], item['Grim Reaping'],
                    item['Matter Absorption'], item['The Force'], item['Resurrection'], item['Terrakinesis'], item['Vision - Heat'], item['Vitakinesis'],
                    item['Radar Sense'], item['Qwardian Power Ring'], item['Weather Control'], item['Vision - X-Ray'], item['Vision - Thermal'],
                    item['Web Creation'], item['Reality Warping'], item['Odin Force'], item['Symbiote Costume'], item['Speed Force'], item['Phoenix Force'],
                    item['Molecular Dissipation'], item['Vision - Cryo'], item['Omnipresent'], item['Omniscient'],

                    ], function(err,result){
                        if(err) throw err;
                        console.log("number of records inserted:" + result.affectedRows);
    
                    });
                }

            console.log('Data inserted'); 
        }catch(error){
            console.error("error:", error);

        }finally{
            connection.end();
            }
        });


}

function insertPowers(){

    console.log("connecting to", process.env.DB_USERNAME,process.env.DATABASE)
    //function that reads the data from JSON file
    const filepath = 'server\\superhero_powers.json'
    const jsonData = JSON.parse(fs.readFileSync(filepath, 'utf-8'))


    //setting up the MySQL connection
    const connection = mysql.createConnection({
        host: process.env.HOST, 
        user: process.env.DB_USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        port: process.env.DB_PORT

    // host: process.env.HOST, 
    // user: 'herohub',
    // password: 'herohub3316',
    // database: process.env.DATABASE,
    // port: process.env.DB_PORT

    }); 

    connection.connect((err)=>{
        if(err){
            console.error('Error:',err);
            return;
        }});

    //inserting powers for each superhero

    try{
        console.log("enter")
        connection.query('USE ' +process.env.DATABASE); 

        // const addCol = 'ALTER TABLE superheroes ADD COLUMN powers TEXT';
        // connection.query(addCol, (err,result)=>{
        //         if(err){
        //             console.error('Error adding col:',err);
        //             return
        //         }
        //     })

            //iterating through objects
            for(const item of jsonData){
                console.log("enter for loop")
                
                    //extracting their true powers for each
                    const truePowers = Object.keys(item).filter((power)=>item[power]==='True');

                    //adding powers only to the superhero whose name matches
                    if(item.hero_names){
                        console.log(item.hero_names)
                        const query = 'UPDATE superheroes SET powers = ? WHERE name =?';
                        const values = [truePowers.join(', '),item.hero_names];

                        connection.query(query,values,(err,result)=>{
                            if(err){
                                console.error("error:",err);
                            }
                            console.log("number of records inserted:" + result.affectedRows);
                        });
                }   
        }
        console.log('Data inserted');

    }catch(error){
        console.error("error:", error);

    }finally{
         connection.end();}

}

//DATA ADDED
//insertPowers();

//netstat -ano | findstr 3306
//taskkill /PID (name) /F