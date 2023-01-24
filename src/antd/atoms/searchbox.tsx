import React from "react";
import { GrFormSearch } from "react-icons/gr";
import { Input } from "antd";

const { Search } = Input;
type Props = {
  placeholder: string;
  onSearch: (value: string) => void;
};
const SearchBox = ({ placeholder, onSearch }: Props) => (
  <Search
    placeholder={placeholder}
    enterButton="Search"
    size="large"
    suffix={<GrFormSearch />}
    onSearch={onSearch}
  />
);

export default SearchBox;
