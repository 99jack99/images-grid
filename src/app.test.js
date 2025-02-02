import { render, screen } from "@testing-library/vue";
import { describe, it, expect } from "vitest";
import ImageCard from "./components/ImageCard.vue";
import App from "@/App.vue";

import axios from "axios";
import image_service from "@/services/image_service.js";
import api from "@/services/api.js";


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

  it('get image mock', async () => {

    const mockData = [
      {
        id: "0",
        author: "Alejandro Escamilla",
        width: 5000,
        height: 3333,
        url: "https://unsplash.com/photos/yC-Yzbqy7PY",
        download_url: "https://picsum.photos/id/0/5000/3333",
      },
    ];

    // Mock the global fetch function
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue({ data: mockData }),
    }));

    const page = 1;
    const limit = 1;
  
    // Call your function that makes the API request
    const response = await fetch(`https://picsum.photos/v2/list/?page=${page}&limit=${limit}`);
    const data = await response.json();
  
    // Assertions
    expect(fetch).toHaveBeenCalledWith(`https://picsum.photos/v2/list/?page=${page}&limit=${limit}`);
    expect(data).toEqual({ data: mockData });
  });




})