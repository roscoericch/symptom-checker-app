import { Input } from "antd";

const { Search } = Input;
type Props = {
  placeholder: string;
  onSearch: (value: string) => void;
};
const SearchBox = ({ placeholder, onSearch }: Props) => (
  <Search placeholder={placeholder} onSearch={onSearch} />
);

export default SearchBox;
