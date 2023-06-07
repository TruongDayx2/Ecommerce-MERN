import axios from 'axios';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import LineChart from '../Chart';
import LineChartC from '../Chart copy';

const totalUser = await axios.get('http://localhost:5001/api/users/totalUsers');
const totalProducts = await axios.get('http://localhost:5001/api/products/totalProducts');
//const totalOrders = await axios.get('http://localhost:5001/api/orders/totalAllOrders');

const Dashboard = () => {
  return (
    <div className="container-scroller">
      <Header />
      <div className="container-fluid page-body-wrapper">
        {/* partial:partials/_settings-panel.html */}
        {/* partial */}
        {/* partial:partials/_sidebar.html */}
        <Sidebar />
        {/* partial */}
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="row">
              <div className="col-sm-12">
                <div className="home-tab">
                  <div className="tab-content tab-content-basic">
                    <div className="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview">
                      <div className="row">
                        <div className="col-sm-12">
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-8 d-flex flex-column">
                          <div className="row flex-grow">
                            <div className="col-12 col-lg-4 col-lg-12 grid-margin stretch-card">
                              <div className="card card-rounded">
                                <div className="card-body">
                                  <div className="d-sm-flex justify-content-between align-items-start">
                                    <div>
                                      <h4 className="card-title card-title-dash">Performance Line Chart</h4>
                                      <h5 className="card-subtitle card-subtitle-dash">Lorem Ipsum is simply dummy text of the printing</h5>
                                    </div>
                                    <div id="performance-line-legend" />

                                  </div>
                                  <div className="chartjs-wrapper mt-5">
                                    <canvas id="performaneLine" />
                                    <LineChart />
                                  </div>
                                  <div className="chartjs-wrapper mt-5">
                                    <canvas id="performaneLine2" />
                                    <LineChartC />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 d-flex flex-column">
                          <div className="row flex-grow">
                            <div className="col-md-6 col-lg-12 grid-margin stretch-card">
                              <div className="card bg-primary card-rounded">
                                <div className="card-body pb-0">
                                  <h4 className="card-title card-title-dash text-white mb-2">Total User</h4>
                                  <div className="row">
                                    <h2 className="text-info">{totalUser.data.data}</h2>
                                    <div className="col-sm-8">
                                      <div className="progress progress-md">
                                        <div className="progress-bar bg-info" role="progressbar" style={{ width: `${totalUser.data.data}%` }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} />
                                      </div>
                                      <div className="status-summary-chart-wrapper pb-4">
                                        <canvas id="status-summary" />
                                      </div>
                                    </div>
                                  </div>
                                  <h4 className="card-title card-title-dash text-white mb-2">Total Products</h4>
                                  <div className="row">
                                    <h2 className="text-info">{totalProducts.data}</h2>
                                    <div className="col-sm-8">
                                      <div className="progress progress-md">
                                        <div className="progress-bar bg-info" role="progressbar" style={{ width: `${totalProducts.data}%` }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} />
                                      </div>
                                      <div className="status-summary-chart-wrapper pb-4">
                                        <canvas id="status-summary" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6 col-lg-12 grid-margin stretch-card">
                              <div className="card card-rounded">
                                <div className="card-body">
                                  <div className="row">
                                    <div className="col-sm-6">
                                      <div className="d-flex justify-content-between align-items-center mb-2 mb-sm-0">
                                        <div className="circle-progress-width">
                                          <div id="totalVisitors" className="progressbar-js-circle pr-2" />
                                        </div>
                                        <div>
                                          <p className="text-small mb-2">Total Visitors</p>
                                          <h4 className="mb-0 fw-bold">26.80%</h4>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-sm-6">
                                      <div className="d-flex justify-content-between align-items-center">
                                        <div className="circle-progress-width">
                                          <div id="visitperday" className="progressbar-js-circle pr-2" />
                                        </div>
                                        <div>
                                          <p className="text-small mb-2">Visits per day</p>
                                          <h4 className="mb-0 fw-bold">9065</h4>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-8 d-flex flex-column">
                          <div className="row flex-grow">
                            <div className="col-12 grid-margin stretch-card">
                              <div className="card card-rounded">
                                <div className="card-body">
                                  <div className="d-sm-flex justify-content-between align-items-start">
                                    <div>
                                      <h4 className="card-title card-title-dash">Market Overview</h4>
                                      <p className="card-subtitle card-subtitle-dash">Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
                                    </div>

                                  </div>
                                  <div className="d-sm-flex align-items-center mt-1 justify-content-between">
                                    <div className="d-sm-flex align-items-center mt-4 justify-content-between"><h2 className="me-2 fw-bold">${ }</h2><h4 className="me-2">USD</h4><h4 className="text-success"></h4></div>
                                    <div className="me-3"><div id="marketing-overview-legend" /></div>
                                  </div>
                                  <div className="chartjs-bar-wrapper mt-3">
                                    <canvas id="marketingOverview" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 d-flex flex-column">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* content-wrapper ends */}
          {/* partial:partials/_footer.html */}
          <Footer />
          {/* partial */}
        </div>
        {/* main-panel ends */}
      </div>
      {/* page-body-wrapper ends */}
    </div>)
}

export default Dashboard;