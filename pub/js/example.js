"use struict";

const nibbler = new nibbleManifester("example", {
  background_color: "white",
  color: "black",
  width_before: 100,
  width_after: 500,
  height_before: 170,
  height_after: 400,
  container_width: 800,
  container_height: 800,
});
nibbler.create();

const contents = {
  title: "My Teen Romantic Comedy SNAFU TOO!",
  rating: "8.23",
  length: "13 episodes",
  studio: "feel.",
  genre: "romcom",
  synopsis:
    "Hachiman Hikigaya is an apathetic high school student with narcissistic and semi-nihilistic tendencies. He firmly believes that joyful youth is nothing but a farce, and everyone who says otherwise is just lying to themselves.",
};
const nibble_example = nibbler.format(
  "/js/thumbnail_example.png",
  contents,
  "https://www.youtube.com/watch?v=AGtaYl-55KI&ab_channel=SpicyExplosionXD"
);

const contents2 = {
  title: "Hunter X Hunter (2011)",
  rating: "9.05",
  length: "148 episodes",
  studio: "Madhouse",
  genre: "adventure shounen",
  synopsis:
    "Hunters devote themselves to accomplishing hazardous tasks, all from traversing the world's uncharted territories to locating rare items and monsters. Before becoming a Hunter, one must pass the Hunter Examination—a high-risk selection process in which most applicants end up handicapped or worse, deceased.",
};

const nibble_example2 = nibbler.format(
  "/js/thumbnail_example_2.jpeg",
  contents2,
  "https://www.youtube.com/watch?v=d6kBeJjTGnY&ab_channel=vizmedia"
);

const contents3 = {
  title: "Jujutsu Kaisen",
  rating: "8.70",
  length: "24 episodes",
  studio: "Mappa",
  genre: "adventure shounen",
  synopsis:
    "Idly indulging in baseless paranormal activities with the Occult Club, high schooler Yuuji Itadori spends his days at either the clubroom or the hospital, where he visits his bedridden grandfather. However, this leisurely lifestyle soon takes a turn for the strange when he unknowingly encounters a cursed item. ",
};

const nibble_example3 = nibbler.format(
  "/js/thumbnail_example_3.jpeg",
  contents3,
  "https://youtu.be/4A_X-Dvl0ws"
);

nibbler.add(nibble_example);
nibbler.add(nibble_example2);
nibbler.add(nibble_example3);
nibbler.add(nibble_example);
nibbler.add(nibble_example2);
nibbler.add(nibble_example3);
nibbler.add(nibble_example);
nibbler.add(nibble_example2);
nibbler.add(nibble_example3);
nibbler.add(nibble_example);
nibbler.add(nibble_example2);
nibbler.add(nibble_example3);
nibbler.add(nibble_example);
nibbler.add(nibble_example2);
nibbler.add(nibble_example3);
nibbler.add(nibble_example);
nibbler.add(nibble_example2);
nibbler.add(nibble_example3);
nibbler.add(nibble_example);
nibbler.add(nibble_example2);
nibbler.add(nibble_example3);
nibbler.add(nibble_example);
nibbler.add(nibble_example2);
nibbler.add(nibble_example3);
