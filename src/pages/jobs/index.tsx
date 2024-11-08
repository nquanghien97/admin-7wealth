import { TableColumnsType, Button, Table, ConfigProvider } from 'antd'
import { useEffect, useState } from 'react';
import { NewsEntity } from '../../entities/News';
import CloseIcon from '../../assets/icons/CloseIcon';
import Delete from './actions/Delete';
import withAuth from '../../hocs/withAuth';
import { formatDate } from '../../utils/formatDate';
import { getAllJobs } from '../../services/jobs';
import Add from './actions/Add';
import Update from './actions/Update';
import EditIcon from '../../assets/icons/EditIcon';
import PlusIcon from '../../assets/icons/PlusIcon';

function News() {

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
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
      width: 120
    },
    {
      title: "Công việc",
      dataIndex: 'job_name',
      key: 2,
      width: 150
    },
    {
      title: "Địa điểm",
      dataIndex: 'location',
      key: 3,
      width: 100
    },
    {
      title: "Loại công việc",
      dataIndex: 'job_type',
      key: 4,
      width: 120
    },
    {
      title: "Mức lương",
      dataIndex: 'salary',
      key: 5,
      width: 100
    },
    {
      title: "Thời gian ứng tuyển",
      key: 6,
      render(value) {
        return (
          <p>{`${value.time_open} - ${value.time_close}`}</p>
        )
      },
      width: 120
    },
    {
      title: "Số lượng",
      dataIndex: 'number_of_recruitment',
      key: 7,
      width: 100
    },
    {
      title: "Mô tả công việc",
      dataIndex: 'job_description',
      key: 8,
      render(value) {
        return(
          <div dangerouslySetInnerHTML={{ __html: value}} />
        )
      },
    },
    {
      title: "Thao tác",
      dataIndex: 9,
      width: 150,
      render(_, record) {
        return (
          <div className="flex flex-col justify-between gap-2">
            <div
              className="flex items-center"
              onClick={() => {
                setOpenEditModal(true)
                setIdNews(record.id)
              }
              }
            >
              <Button
                className="w-full"
                type="primary"
                icon={<EditIcon width={16} height={16} color="black" />}
              >
                <p className="text-black">Sửa</p>
              </Button>
            </div>
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
      const res = await getAllJobs({ page, pageSize });
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
      <div className="flex mb-4">
        <div className="m-auto">
          <span className="px-6 p-2 rounded-full bg-[#24652c] uppercase font-bold text-2xl">Quản lý Công việc</span>
        </div>
        <div
          className="bg-[#24652c] rounded-md cursor-pointer h-full px-4 py-2 flex items-center justify-center hover:opacity-80 duration-300 text-white"
          onClick={() => setOpenAddModal(true)}
        >
          Thêm mới
          <PlusIcon color="white" />
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
      {openAddModal && <Add open={openAddModal} onClose={() => setOpenAddModal(false)} setRefreshKey={setRefreshKey} />}
      {openEditModal && <Update open={openEditModal} onClose={() => setOpenEditModal(false)} id={idNews} setRefreshKey={setRefreshKey} />}
      {openDeleteModal && <Delete open={openDeleteModal} onCancel={() => setOpenDeleteModal(false)} id={idNews} setRefreshKey={setRefreshKey} />}
    </div>
  )
}

const NewsWithAuth = withAuth(News)

export default NewsWithAuth