import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../src/components/Header"
import { Provider } from "react-redux"
import appStore from "../redux/appStore";
import { BrowserRouter } from "react-router-dom";

describe("Header Test Cases", () => {
    it("should load login button",() => {
        render(<BrowserRouter>
            <Provider store={appStore}>
                <Header/>
            </Provider>
        </BrowserRouter>);
        const loginButton = screen.getByRole("button");
        expect(loginButton).toBeInTheDocument();
    })
})