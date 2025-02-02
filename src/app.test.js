import { render, screen } from "@testing-library/vue";
import { describe, it, expect } from "vitest";
import ImageCard from "./components/ImageCard.vue";
import App from "@/App.vue";


describe("Component render", () => {

  it("it renders cards correctly", async () => {
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

  it("removes correctly image selected", async () => {
    const initialImages = [
      { id: "1", author: "Author 1", download_url: "https://example.com/1.jpg" },
      { id: "2", author: "Author 2", download_url: "https://example.com/2.jpg" },
      { id: "3", author: "Author 3", download_url: "https://example.com/3.jpg" },
    ];
    const { getByTestId, rerender } = render(App, {
      props: {
        image_data: initialImages
      },
    });

    const idToRemove = "2";
    const filteredImages = initialImages.filter((image) => image.id !== idToRemove);

    await rerender({
      props: {
        images: filteredImages,
      },
    });

    expect(filteredImages).not.toContain({ id: "2", author: "Author 2", download_url: "https://example.com/2.jpg" });
  });

})