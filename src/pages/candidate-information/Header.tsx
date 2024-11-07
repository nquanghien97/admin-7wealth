import { Button, Form, Input, Tooltip } from "antd";
import SearchIcon from "../../assets/icons/SearchIcon";
import { SearchFormType } from ".";

interface HeaderProps {
  setSearchForm: React.Dispatch<React.SetStateAction<SearchFormType>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

function Header(props: HeaderProps) {
  const { setSearchForm, setLoading } = props;
  const [form] = Form.useForm();

  const onFinish = async (data: SearchFormType) => {
    setLoading(true);
    setSearchForm(pre => ({...pre, ...data}));
  }

  return (
    <Form onFinish={onFinish} className="flex py-2 justify-between" form={form}>
      <div className="flex gap-2 items-center">
        <Form.Item
          className="w-[160px]"
          name="full_name"
        >
          <Input
            placeholder="Họ tên"
            className="py-2"
            rootClassName="border-[1px] border-[#24652c] rounded-lg"
            allowClear
          />
        </Form.Item>
        <Form.Item
          className="w-[160px]"
          name="phone_number"
        >
          <Input
            placeholder="Số điện thoại"
            className="py-2"
            rootClassName="border-[1px] border-[#24652c] rounded-lg"
            allowClear
          />
        </Form.Item>
        <Form.Item>
          <Tooltip title="Tìm kiếm">
            <Button
              htmlType="submit"
              className="bg-[#24652c] hover:!bg-[#c58229] duration-300"
              shape="circle"
              icon={<SearchIcon color="white" />}
            />
          </Tooltip>
        </Form.Item>
      </div>
    </Form>
  )
}

export default Header;

