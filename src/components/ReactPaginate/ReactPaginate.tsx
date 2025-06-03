interface ReactPaginateProps {
  pageCount: number;
  pageRangeDisplayed: number;
  marginPagesDisplayed: number;
  onPageChange: (page: number) => void;
  forcePage: number;
  containerClassName: string;
  activeClassName: string;
  nextLabel: string;
  previousLabel: string;
}
