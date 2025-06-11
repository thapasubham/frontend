import "@testing-library/jest-dom";

global.fetch = jest.fn();

jest.mock("axios");


jest.mock('./src/api/apiHelpers', () => ({
    getCookie: jest.fn(() => 'mocked-token'),
    config: {
        apiUrl: "http://localhost:mock",
    },
}));

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({

    useNavigate: () => mockedUsedNavigate,
    useParams: jest.fn(),
}))
export { mockedUsedNavigate };