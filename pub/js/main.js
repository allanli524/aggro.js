/**
 * This is aggro.js, a  library that allows the developer to bypass the hassle of creating code
 * for the purpose of displaying information about tv shows and animes on websites such as IMDB and
 * myanimelist.
 * The end user will be able to view pre determined information about the show/movie by hovering over the image
 * a table will appear which will display information and a button will appear which when clicked will further expand into
 * a popup window with a short discription of the show along with other screenshots.
 * Animation and styling will be automatically added to aggregated table.
 * This is made to help those websites become more responsive and user friendly.
 */

/**
 *
 * @param {*} image url of main image to display
 * @param {*} id_parent id of the parent in the dom
 * @param {*} style object with keys values pairs
 * background_color: color
 * line_color: color
 * width_before: width
 * width_after: width
 * height_before: height
 * height_after: height
 * @param {*} content object with key values pairs
 * title: text
 * rating: text
 * length: text
 * producer: text
 * genre: text
 * studio: text
 * synopsis: text
 * trailer: text
 * @returns
 */

(function (global, document, $) {
  function nibbleManifester(parent_id, styling) {
    this.parent_id = parent_id;

    const style_exemplar = [
      ["background_color", "white"],
      ["color", "black"],
      ["width_before", 100],
      ["width_after", 500],
      ["height_before", 170],
      ["height_after", 400],
      ["container_width", 1000],
      ["container_height", 1000],
    ];
    style_exemplar.forEach((value) => {
      if (!(value[0] in styling)) {
        styling[value[0]] = value[1];
      }
    });
    this.styling = styling;
    this.container = null;
    this.contents = 0;
    this.rows = 0;
    this.z_incr = 1;
  }

  nibbleManifester.prototype = {
    format: function (image, content = {}, trailer = "") {
      const data = {};

      if (image) {
        data.image = image;
      } else {
        throw "image field cannot be empty";
      }

      data.content = content;
      const content_exemplar = [
        ["title", "N/A"],
        ["rating", "N/A"],
        ["length", "N/A"],
        ["producer", "N/A"],
        ["genre", "N/A"],
        ["studio", "N/A"],
        ["synopsis", "N/A"],
      ];
      content_exemplar.forEach((value) => {
        if (!(value[0] in data.content)) {
          data.content[value[0]] = value[1];
        }
      });

      data.trailer = trailer;

      return data;
    },
    create: function () {
      //create empty div with styling
      const container = document.createElement("div");
      container.className = "nibble_container";
      console.log(this.styling.container_height);
      const container_style = `height: ${this.styling.container_height}px; width: ${this.styling.container_width}px; position: relative`;
      container.style = container_style;

      const target_parent = document.getElementById(this.parent_id);
      if (!target_parent) {
        throw "parent id cannot be located in DOM";
      }
      target_parent.appendChild(container);
      this.container = container;
    },
    add: function (info) {
      if (this.container === null) {
        console.log("must create nibble container first!");
        throw "must create nibble container first!";
      }

      //index number
      const i = this.contents;

      //status for hover off
      let hover = true;

      //calculate position to absolute based on index
      const index = this.contents;
      const top =
        Math.floor(
          index /
            Math.floor(this.styling.container_width / this.styling.width_before)
        ) * this.styling.height_before;
      const left =
        (index %
          Math.floor(
            this.styling.container_width / this.styling.width_before
          )) *
        this.styling.width_before;
      this.contents += 1;
      const style_base = `position: absolute; top: ${top}px; left: ${left}px; `;
      const styles_before =
        style_base +
        `z-index: 0; width: ${this.styling.width_before}px; height: ${this.styling.height_before}px; color: ${this.styling.color}; background-color: ${this.styling.background_color}`;
      const styles_after =
        style_base +
        `z-index: 1; width: ${this.styling.width_after}px; height: ${this.styling.height_after}px; color: ${this.styling.color}; background-color: ${this.styling.background_color}`;

      const nibble = document.createElement("div");
      nibble.id = `nibble_${i}`;
      nibble.className = "nibble";
      nibble.style = styles_before;

      //create img
      const img = document.createElement("img");
      img.src = info.image;
      img.classList.add("thumbnail_pic");
      img.id = `img_thumbnail_${i}`;
      nibble.appendChild(img);

      const ul1 = document.createElement("ul");
      ul1.classList.add("fields_list");
      Object.keys(info.content).forEach((key) => {
        if (key != "synopsis") {
          const li1 = document.createElement("li");
          li1.className = "field_element";

          const p_b = document.createElement("p");
          p_b.className = "text_heavy";
          const t1 = document.createTextNode(`${key}:`);
          p_b.appendChild(t1);

          const p_n = document.createElement("p");
          const t2 = document.createTextNode(info.content[key]);
          p_n.appendChild(t2);
          p_n.style.marginLeft = "2%";
          li1.appendChild(p_b);
          li1.appendChild(p_n);

          ul1.appendChild(li1);
        }
      });

      //create unlock button
      const unlock = document.createElement("button");
      unlock.classList.add("button_g");
      unlock.textContent = "Unlock";
      unlock.style = `float: left; margin: 2%; display: none; color: ${this.styling.color}; border: 2px solid ${this.styling.color};`;
      unlock.id = `unlock_${i}`;

      unlock.addEventListener("click", (e) => {
        e.preventDefault();
        hover = true;
        const target = document.getElementById(`unlock_${i}`);
        target.style.display = "none";
        e.stopPropagation();
      });

      nibble.appendChild(unlock);

      //add event listener for mouseover and mouseout
      nibble.addEventListener("mouseover", (e) => {
        e.stopPropagation();
        if (hover) {
          e.preventDefault();
          //change class of img
          const target = document.getElementById(`img_thumbnail_${i}`);
          const parent = document.getElementById(`nibble_${i}`);
          target.classList.remove("thumbnail_pic");
          target.classList.add("thumbnail_pic_hover");

          //change nibble style
          parent.className = "nibble_after";
          parent.style = styles_after;
          setTimeout(() => {
            if (parent.className == "nibble_after") {
              parent.appendChild(ul1);
            }
          }, 101);
        }
      });

      nibble.addEventListener("mouseleave", (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (hover) {
          //change class of image
          const target = document.getElementById(`img_thumbnail_${i}`);
          const parent = document.getElementById(`nibble_${i}`);
          target.classList.remove("thumbnail_pic_hover");
          target.classList.add("thumbnail_pic");
          //change nibble style
          parent.className = "nibble";
          parent.style = styles_before;
          if (parent.children.length == 4) {
            parent.removeChild(ul1);
          }
          //check for extra
          const extra_btn = document.getElementById(`btn_more_${i}`);
          extra_btn.style.display = "none";
          const content = document.getElementById(`extra_${i}`);
          if (content) {
            content.style.display = "none";
          }
        }
      });

      nibble.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        hover = false;
        const target = document.getElementById(`unlock_${i}`);
        target.style.display = "block";
        const extra_btn = document.getElementById(`btn_more_${i}`);
        extra_btn.style.display = "block";
        const extra_content = document.getElementById(`extra_${i}`);
        const parent = document.getElementById(`nibble_${i}`);
        this.z_incr += 1;
        const z = this.z_incr;
        parent.style.zIndex = z;
        extra_content.style.zIndex = z;
        // console.log(z);
      });

      //check for extension
      const more = add_extension(i, info, this.styling, top, left);
      this.update_container();
      nibble.appendChild(more[1]);
      this.container.appendChild(nibble);
      this.container.appendChild(more[0]);
    },
    update_container: function () {
      if (this.container) {
        //calculate number of rows
        const expected =
          Math.floor(
            this.contents /
              Math.floor(
                this.styling.container_width / this.styling.width_before
              )
          ) *
          (this.styling.height_before + 1);
        if (expected != this.rows) {
          this.rows = expected;
          const container_style = `height: ${expected}px; width: ${this.styling.container_width}px; position: relative`;
          this.container.style = container_style;
        }
      }
    },
  };

  const add_extension = (i, data, style, top, left) => {
    // add extension button
    const btn = document.createElement("button");
    btn.classList.add("button_g");
    btn.id = `btn_more_${i}`;
    btn.style = `display: none; margin: 2%; color: ${style.color}; border: 2px solid ${style.color}; float: right;`;
    const t1 = document.createTextNode("More Information");
    btn.appendChild(t1);

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const content = document.getElementById(`extra_${i}`);
      content.style.display = "block";
    });

    //create the extra information table and extra images
    const syno = document.createElement("div");
    const text = document.createElement("p");
    text.innerHTML = data.content.synopsis;
    syno.appendChild(text);
    syno.style.marginLeft = "5%";

    const trailer = document.createElement("button");
    trailer.classList.add("button_g");
    const link = document.createElement("a");
    const linkText = document.createTextNode("Watch Trailer");
    link.appendChild(linkText);
    link.href = data.trailer;
    link.target = "_blank";
    // link.style.textDecoration = "none";
    // trailer.style.marginBottom = "5%";
    // trailer.style.marginLeft = "5%";
    trailer.style = `text-decoration: none; margin-bottom: 5%; margin-left: 5%; color: ${style.color}; border: 2px solid ${style.color};`;
    trailer.appendChild(link);

    const extra = document.createElement("div");
    extra.appendChild(syno);
    extra.appendChild(trailer);

    //assign attributes to "extra"
    extra.id = `extra_${i}`;
    extra.style = `display: none; position: absolute; top: ${
      top + style.height_after
    }px; left: ${left}px; width: ${
      style.width_after
    }px; height: auto; background-color: ${
      style.background_color
    }; border: 1px solid ${style.color};`;
    return [extra, btn];
  };
  global.nibbleManifester = global.nibbleManifester || nibbleManifester;
})(window, window.document, $);
