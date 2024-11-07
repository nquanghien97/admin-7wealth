import { TableColumnsType, Button, Table, ConfigProvider } from 'antd'
import { useEffect, useState } from 'react';
import CloseIcon from '../../assets/icons/CloseIcon';
import DeleteJob from './actions/Delete';
import withAuth from '../../hocs/withAuth';
import { getAllCandidate } from '../../services/candidate_information';
import DownloadIcon from '../../assets/icons/DownloadIcon';
import { formatDate } from '../../utils/formatDate';
import Header from './Header';
import { JobEntity } from '../../entities/Job';

export interface SearchFormType {
  full_name?: string;
  phone_number?: string;
  page: number;
  pageSize: number;
}

function Job() {

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<JobEntity[]>([]);
  const [paging, setPaging] = useState({
    page: 1,
    pageSize: 10,
    total: 20
  })
  const [refreshKey, setRefreshKey] = useState(false);
  const [idJob, setIdJob] = useState(-1);
  const [searchForm, setSearchForm] = useState<SearchFormType>({
    page: 1,
    pageSize: 10,
    phone_number: '',
    full_name: '',
  })

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
                  setIdJob(record.id)
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

  const fetchData = async (searchForm: SearchFormType) => {
    setLoading(true);
    try {
      const res = await getAllCandidate(searchForm);
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
      await fetchData(searchForm)
    })()
  }, [refreshKey, searchForm])

  const onChangePaging = async (page: number, pageSize: number) => {
    setPaging({
      ...paging,
      page,
      pageSize
    })
    setSearchForm({...searchForm, page, pageSize})
  }

  return (
    <div className="h-full p-4">
      <Header setLoading={setLoading} setSearchForm={setSearchForm} />
      <div className="flex mb-4">
        <div className="m-auto">
          <span className="px-6 p-2 rounded-full bg-[#24652c] uppercase font-bold text-2xl">Quản lý Công việc</span>
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
      {openDeleteModal && <DeleteJob open={openDeleteModal} onCancel={() => setOpenDeleteModal(false)} id={idJob} setRefreshKey={setRefreshKey} />}
    </div>
  )
}

const JobWithAuth = withAuth(Job)

export default JobWithAuth