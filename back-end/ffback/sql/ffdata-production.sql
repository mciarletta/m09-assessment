drop database if exists ffdata;
create database ffdata;
use ffdata;

create table review (
    review_id int primary key auto_increment,
    game_id int not null,
    title varchar(255) not null,
	rating decimal(2, 1) not null,
	review_body text not null,
	date_posted date not null
);

insert into review (game_id, title, rating, review_body, date_posted)
values
('4', 'Final Fantasy 4', '9.2', 
'In the realm of classic RPGs, Final Fantasy IV for the Super Nintendo Entertainment System (SNES) remains an enduring masterpiece that has left an indelible mark on the hearts of gamers since its release in 1991. From its captivating narrative to the iconic characters and innovative gameplay, Final Fantasy IV is a testament to the magic of the 16-bit era.
The journey begins with the iconic Red Wings theme, signaling the start of a grand adventure. At its core, the narrative revolves around Cecil Harvey, a dark knight seeking redemption, embroiled in a tale of political intrigue and cosmic conflict. The storytelling is nothing short of epic, seamlessly weaving personal growth into a larger-than-life struggle between light and darkness.
What sets Final Fantasy IV apart is its memorable cast of characters. From the conflicted Cecil to the lovable Cid and the enigmatic Rydia, each character is a vibrant personality with their own dreams and flaws. The relationships forged among them create an emotional depth that transcends the limitations of 16-bit graphics, making the player genuinely care about their fates.
Visually, Final Fantasy IV is a masterpiece. The sprites and environments, though pixelated by todays standards, exude charm and character. Nobuo Uematsus musical score enhances the experience, with tracks like "Theme of Love" and "Red Wings" becoming iconic in the realm of video game music.
The gameplay is a highlight, introducing the Active Time Battle (ATB) system that would become a series staple. The strategic turn-based combat keeps players engaged, with a balanced difficulty curve and a gradual unveiling of new abilities. The progression system allows for customization, adding depth to the gameplay without overwhelming newcomers to the genre.
More than just a game, Final Fantasy IV is an immersive odyssey through a meticulously crafted fantasy world. As the characters grow, so does the emotional investment of the player. The games climax is not merely a conclusion to a quest but a profound, emotional experience that lingers in memory.
In the pantheon of Final Fantasy titles, IV stands tall as a timeless classic. It proves that even in the pixelated realms of 16-bit graphics, a gripping tale of heroism and sacrifice can unfold. Whether youre a seasoned RPG enthusiast or a newcomer to the genre, Final Fantasy IV for the SNES offers a journey that transcends the boundaries of its time, leaving an everlasting impression of adventure, camaraderie, and the enduring power of storytelling in video games.',
'2023-10-04')
