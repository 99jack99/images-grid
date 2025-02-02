import { render, screen } from "@testing-library/vue";
import { describe, it, expect } from "vitest";
import ImageCard from "@/components/ImageCard.vue";
import App from "@/App.vue";

describe("App test", () => {

  const mock_object = {
    id: "0",
    author: "Alejandro Escamilla",
    width: 5000,
    height: 3333,
    url: "https://unsplash.com/photos/yC-Yzbqy7PY",
    download_url: "https://picsum.photos/id/0/5000/3333"
  };

  it("it renders cards correctly, and get props", async () => {
    render(ImageCard, {
      props: { image_data: mock_object },
    });
  });

  it("removes correctly image selected", async () => {
    const initialImages = [
      { id: "1", author: "Author 1", download_url: "https://example.com/1.jpg" },
      { id: "2", author: "Author 2", download_url: "https://example.com/2.jpg" },
      { id: "3", author: "Author 3", download_url: "https://example.com/3.jpg" },
    ];
    const { rerender } = render(App, {
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

  it('get image mock', async () => {

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue({ data: mock_object }),
    }));

    const page = 1;
    const limit = 1;
  
    const response = await fetch(`https://picsum.photos/v2/list/?page=${page}&limit=${limit}`);
    const data = await response.json();
  
    expect(fetch).toHaveBeenCalledWith(`https://picsum.photos/v2/list/?page=${page}&limit=${limit}`);
    expect(data).toEqual({ data: mock_object });
  });

})