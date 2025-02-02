import { render, screen } from "@testing-library/vue";
import { describe, it, expect } from "vitest";
import ImageCard from "./components/ImageCard.vue";

describe("Component render", () => {

  it("render info correct", async () => {
    //arrange
    const object = {
        id: "0",
        author: "Alejandro Escamilla",
        width: 5000,
        height: 3333,
        url: "https://unsplash.com/photos/yC-Yzbqy7PY",
        download_url: "https://picsum.photos/id/0/5000/3333"
    };
    render(ImageCard, {
      props: { image_data: object },
    });

  });

});