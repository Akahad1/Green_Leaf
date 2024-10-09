"use client";

import React, { useState } from "react";
import { Editor, EditorState, RichUtils, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import Image from "next/image";
import Link from "next/link";

// Helper function to convert editor state to raw text (serializing)
const getPostContent = (editorState: EditorState) => {
  const contentState = editorState.getCurrentContent();
  const rawContent = convertToRaw(contentState);
  return rawContent; // You can save this raw content to a backend
};

const PostEditorModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [images, setImages] = useState<File[]>([]);
  const [category, setCategory] = useState(""); // State for category
  const [isPremium, setIsPremium] = useState(false); // State for premium toggle

  // Open modal when clicking "What's on your mind?"
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditorState(EditorState.createEmpty()); // Reset editor state when closed
    setImages([]); // Clear image previews when modal closes
    setCategory(""); // Reset category
    setIsPremium(false); // Reset premium toggle
  };

  // Handle editor state changes
  const onChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
  };

  // Handle basic formatting commands (bold, italic, underline)
  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  // Style toggling (Bold, Italic, Underline buttons)
  const toggleInlineStyle = (style: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  // Handle image uploads
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  // Remove image
  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handlePost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload on submit
    const postContent = getPostContent(editorState); // Get editor content as raw text
    console.log("Post Content:", postContent);
    console.log("Attached Images:", images); // Get the attached images
    console.log("Category:", category); // Get selected category
    console.log("Premium Status:", isPremium); // Get premium status

    // Example: You can now send postContent, images, category, and premium status to your backend

    closeModal(); // Close modal after posting
  };

  return (
    <div className="relative ">
      {/* Main "What's on your mind?" input box */}
      <div>
        <div className="w-12 mt-3 bg-gray-200"></div>
        <div className="w-full max-w-lg flex p-4 rounded-lg shadow-lg lg:mr-20 cursor-pointer">
          <Link href="/profile">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStqtktl3g6wWkAzvUAi32yzYgb-jZ0-Pn0sQ&s"
              alt="Profile Image"
              width={48}
              height={48}
              className="rounded-full mr-6 lg:mr-16"
            />
          </Link>
          <input
            onClick={openModal}
            type="text"
            placeholder="What's on your mind?"
            className="border rounded-xl bg-slate-300 p-2 placeholder-black px-4 lg:w-96 w-full"
          />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full md:max-w-4xl sm:w-full">
            <form onSubmit={handlePost}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Create Post</h3>
                <button
                  type="button"
                  className="text-gray-600 text-2xl"
                  onClick={closeModal}
                >
                  &times;
                </button>
              </div>

              {/* Post Content Editor */}
              <div className="bg-gray-100 border border-gray-300 p-2 rounded-lg min-h-[150px]">
                <Editor
                  editorState={editorState}
                  onChange={onChange}
                  handleKeyCommand={handleKeyCommand}
                  placeholder="Share your thoughts..."
                />
              </div>

              {/* Style Buttons */}
              <div className="mt-2 flex space-x-2">
                <button
                  type="button"
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => toggleInlineStyle("BOLD")}
                >
                  Bold
                </button>
                <button
                  type="button"
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => toggleInlineStyle("ITALIC")}
                >
                  Italic
                </button>
                <button
                  type="button"
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => toggleInlineStyle("UNDERLINE")}
                >
                  Underline
                </button>
              </div>

              {/* Image Upload */}
              <div className="mt-4">
                <label className="block text-gray-700">Attach Images:</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="mt-2"
                />
                {/* Preview selected images */}
                <div className="flex flex-wrap mt-4 space-x-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="preview"
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        onClick={() => removeImage(index)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category Selection */}
              <div className="mt-4">
                <label className="block text-gray-700">Select Category:</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="border border-gray-300 p-2 rounded-lg w-full"
                  required
                >
                  <option value="" disabled>
                    Choose a category
                  </option>
                  <option value="Gardening Tips">Gardening Tips</option>
                  <option value="Plant Care">Plant Care</option>
                  <option value="Seasonal Advice">Seasonal Advice</option>
                  {/* Add more categories as needed */}
                </select>
              </div>

              {/* Premium Toggle */}
              <div className="mt-4">
                <label className="block text-gray-700">Premium Post:</label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isPremium}
                    onChange={(e) => setIsPremium(e.target.checked)}
                    className="mr-2"
                  />
                  <span>{isPremium ? "Premium" : "Regular"}</span>
                </div>
              </div>

              {/* Post Button */}
              <div className="mt-6 text-right">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostEditorModal;
