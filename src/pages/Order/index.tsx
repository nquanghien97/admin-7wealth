import { Button, ConfigProvider, Table, TableColumnsType } from "antd";
import DeleteOrder from "./action/DeleteOrder";
import { useEffect, useState } from "react";
import { getOrders } from "../../services/order";
import CloseIcon from "../../assets/icons/CloseIcon";
import { OrderEntity } from "../../entities/Order";
import { formatDate } from "../../utils/formatDate";

function Order() {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<OrderEntity[]>([]);
  const [paging, setPaging] = useState({
    page: 1,
    pageSize: 10,
    total: 10
  })
  const [refreshKey, setRefreshKey] = useState(false);
  const [idNews, setIdNews] = useState(-1);

  useEffect(() => {
    document.title = "Đơn hàng"
  }, []);

  const columns: TableColumnsType = [
    {
      title: "Thời gian",
      dataIndex: 'createdAt',
      key: 1,
      render(value) {
        return formatDate(value)
      }
    },
    {
      title: "Họ tên",
      dataIndex: 'fullName',
      key: 1,
    },
    {
      title: "Số điện thoại",
      dataIndex: 'phoneNumber',
      key: 2,
    },
    {
      title: "Sản phẩm",
      dataIndex: 'productName',
      key: 3,
    },
    {
      title: "Số lượng",
      dataIndex: 'quantity',
      key: 4,
    },
    {
      title: "Tỉnh/Thành phố",
      dataIndex: 'province',
      key: 5,
    },
    {
      title: "Quận/Huyện",
      dataIndex: 'district',
      key: 6,
    },
    {
      title: "Phường/Xã",
      dataIndex: 'ward',
      key: 7,
    },
    {
      title: "Địa chỉ",
      dataIndex: 'address',
      key: 8,
    },
    {
      title: "Thao tác",
      dataIndex: 5,
      width: 150,
      render(_, record) {
        return (
          <div className="flex flex-col justify-between gap-2">
            <div className="flex items-center min-w-[120px]">
              <Button
                icon={<CloseIcon />}
                type="primary"
                danger
                className="w-full"
                onClick={() => {
                  setOpenDeleteModal(true)
                  setIdNews(record.id)
                }}
              >
                <p>Xóa</p>
              </Button>
            </div>
          </div>
        )
      },
    }
  ]

  const fetchData = async ({ page, pageSize }: { page: number, pageSize: number }) => {
    setLoading(true);
    try {
      const res = await getOrders({ page, pageSize });
      setData(res.data.data);
      setPaging(res.data.paging)
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      await fetchData({ page: paging.page, pageSize: paging.pageSize })
    })()
  }, [paging.page, paging.pageSize, refreshKey])

  const onChangePaging = async (page: number, pageSize: number) => {
    await fetchData({ page: page, pageSize: pageSize })
  }

  return (
    <div className="h-full p-4">
      <div className="flex mb-4">
        <div className="m-auto">
          <span className="px-6 p-2 rounded-full bg-[#24652c] uppercase font-bold text-2xl">Quản lý Đơn hàng</span>
        </div>
      </div>
      <ConfigProvider
        theme={{
          token: {
            borderRadius: 8,
          },
          components: {
            Table: {
              borderColor: "black",
              headerBg: "#24652c !important",
              headerColor: "white",
            }
          }
        }}
      >
        <Table
          dataSource={data}
          columns={columns}
          rowHoverable={false}
          rowKey={record => record.id}
          rowClassName={(_, index) => index % 2 === 0 ? 'bg-[#e9e9e9]' : 'bg-white'}
          bordered
          loading={loading}
          pagination={{
            total: paging.total,
            pageSize: paging.pageSize,
            onChange: onChangePaging,
            showSizeChanger: true
          }}
          scroll={{ y: 700 }}
        />
      </ConfigProvider>
      {openDeleteModal && <DeleteOrder open={openDeleteModal} onCancel={() => setOpenDeleteModal(false)} id={idNews} setRefreshKey={setRefreshKey} />}
    </div>
  )
}

export default Order