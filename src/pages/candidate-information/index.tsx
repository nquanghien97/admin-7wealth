import { TableColumnsType, Button, Table, ConfigProvider } from 'antd'
import { useEffect, useState } from 'react';
import { NewsEntity } from '../../entities/News';
import CloseIcon from '../../assets/icons/CloseIcon';
import DeleteNews from './actions/Delete';
import withAuth from '../../hocs/withAuth';
import { getAllCandidate } from '../../services/candidate_information';
import DownloadIcon from '../../assets/icons/DownloadIcon';
import { formatDate } from '../../utils/formatDate';

function News() {

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<NewsEntity[]>([]);
  const [paging, setPaging] = useState({
    page: 1,
    pageSize: 10,
    total: 20
  })
  const [refreshKey, setRefreshKey] = useState(false);
  const [idNews, setIdNews] = useState(-1);

  useEffect(() => {
    document.title = "Tin tức"
  }, []);

  const columns: TableColumnsType = [
    {
      title: "Thời gian",
      dataIndex: 'created_at',
      key: 1,
      render(value) {
        return formatDate(value)
      },
    },
    {
      title: "Họ tên",
      dataIndex: 'full_name',
      key: 2,
    },
    {
      title: "Email",
      dataIndex: 'email',
      key: 3,
    },
    {
      title: "Số điện thoại",
      dataIndex: 'phone_number',
      key: 4,
    },
    {
      title: "Năm sinh",
      dataIndex: 'date_of_birth',
      key: 5,
    },
    {
      title: "Nội dung",
      dataIndex: 'content',
      key: 6,
    },
    {
      title: "Trình độ học vấn",
      dataIndex: 'education',
      key: 7,
    },
    {
      title: "Địa chỉ",
      dataIndex: 'current_address',
      key: 8,
    },
    {
      title: "Số năm kinh nghiệm",
      dataIndex: 'years_of_experience',
      key: 9,
    },
    {
      title: "Thu nhập mong muốn",
      dataIndex: 'salary_expect',
      key: 10,
    },
    {
      title: "Thời gian dự kiến nhận việc",
      dataIndex: 'availability_time',
      key: 11,
    },
    {
      title: "CV ứng viên",
      key: 12,
      dataIndex: 'file',
      render(value) {
        return (
          <a download href={`${import.meta.env.VITE_API_URL}/${value}`} className="flex">
            <span className="mr-2">Tải xuống</span>
            <DownloadIcon width={24} height={24} />
          </a>
        )
      },
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
      const res = await getAllCandidate({ page, pageSize });
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
    setPaging({
      ...paging,
      page,
      pageSize
    })
  }

  return (
    <div className="h-full p-4">
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
      {openDeleteModal && <DeleteNews open={openDeleteModal} onCancel={() => setOpenDeleteModal(false)} id={idNews} setRefreshKey={setRefreshKey} />}
    </div>
  )
}

const NewsWithAuth = withAuth(News)

export default NewsWithAuth