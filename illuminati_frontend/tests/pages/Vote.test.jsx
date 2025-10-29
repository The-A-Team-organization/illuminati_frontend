import "@testing-library/jest-dom";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import Vote from "../../src/pages/Vote";
import * as api from "../../src/api";

vi.mock("../../src/components/Navbar", () => ({
  default: () => <div data-testid="navbar">Mock Navbar</div>,
}));

vi.mock("../../src/auth", () => ({
  getAuthToken: vi.fn(() => "mockToken"),
}));

vi.mock("../../src/api", () => ({
  getVotes: vi.fn(),
  sendVote: vi.fn(),
}));

describe("Vote component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders loading state initially", async () => {
    api.getVotes.mockResolvedValueOnce({ status: "OK", data: [] });
    render(<Vote />);
    expect(screen.getByText("Loading votes...")).toBeInTheDocument();
  });

  test("renders Navbar and 'no active votes' when list is empty", async () => {
    api.getVotes.mockResolvedValueOnce({ status: "OK", data: [] });
    render(<Vote />);
    expect(await screen.findByTestId("navbar")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByText("There are no active votes")).toBeInTheDocument(),
    );
  });

  test("fetches and displays list of votes", async () => {
    const mockVotes = [
      { id: 1, name: "Vote 1", vote_type: "Law" },
      { id: 2, name: "Vote 2", vote_type: "Event" },
    ];
    api.getVotes.mockResolvedValueOnce({ status: "OK", data: mockVotes });
    render(<Vote />);
    await waitFor(() => expect(api.getVotes).toHaveBeenCalledWith("mockToken"));

    expect(await screen.findByText("Active Votes")).toBeInTheDocument();
    expect(screen.getByText("Vote 1")).toBeInTheDocument();
    expect(screen.getByText("Vote 2")).toBeInTheDocument();
  });

  test("handles API error during fetch", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    api.getVotes.mockRejectedValueOnce(new Error("Network error"));
    render(<Vote />);
    await waitFor(() =>
      expect(screen.getByText("Failed to fetch votes")).toBeInTheDocument(),
    );
    consoleError.mockRestore();
  });

  test("shows error when server returns bad status", async () => {
    api.getVotes.mockResolvedValueOnce({ status: "FAIL", data: [] });
    render(<Vote />);
    await waitFor(() =>
      expect(
        screen.getByText("Server returned wrong response"),
      ).toBeInTheDocument(),
    );
  });
});
