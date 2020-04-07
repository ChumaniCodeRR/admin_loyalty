import React, { Component } from 'react';

class ClientTransactions extends Component {
  render() {
    return (
      <div className='card'>
        <div className='card-header'>
          <h4 className='card-title'>Latest transactions</h4>
        </div>
        <div className='card-body'>
          <div className="card-body">
            <table id="advanced_table" className="table">
              <thead>
              <tr>
                <th className="nosort" width="10">
                  <label className="custom-control custom-checkbox m-0">
                    <input type="checkbox" className="custom-control-input" id="selectall" name="" value="option2" />
                      <span className="custom-control-label">&nbsp;</span>
                  </label>
                </th>
                <th className="nosort">Avatar</th>
                <th>Name</th>
                <th>Position</th>
                <th>Office</th>
                <th>Age</th>
                <th>Start date</th>
                <th>Salary</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>
                  <label className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input select_all_child" id="" name=""
                           value="option2" />
                      <span className="custom-control-label">&nbsp;</span>
                  </label>
                </td>
                <td><img src="/assets/img/users/1.jpg" className="table-user-thumb" alt="" /></td>
                <td>Tiger Nixon</td>
                <td>System Architect</td>
                <td>Edinburgh</td>
                <td>61</td>
                <td>2011/04/25</td>
                <td>$320,800</td>
              </tr>
              <tr>
                <td>
                  <label className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input select_all_child" id="" name=""
                           value="option2" />
                      <span className="custom-control-label">&nbsp;</span>
                  </label>
                </td>
                <td><img src="/assets/img/users/2.jpg" className="table-user-thumb" alt="" /></td>
                <td>Garrett Winters</td>
                <td>Accountant</td>
                <td>Tokyo</td>
                <td>63</td>
                <td>2011/07/25</td>
                <td>$170,750</td>
              </tr>
              <tr>
                <td>
                  <label className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input select_all_child" id="" name=""
                           value="option2" />
                      <span className="custom-control-label">&nbsp;</span>
                  </label>
                </td>
                <td><img src="/assets/img/users/3.jpg" className="table-user-thumb" alt="" /></td>
                <td>Ashton Cox</td>
                <td>Junior Technical Author</td>
                <td>San Francisco</td>
                <td>66</td>
                <td>2009/01/12</td>
                <td>$86,000</td>
              </tr>
              <tr>
                <td>
                  <label className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input select_all_child" id="" name=""
                           value="option2" />
                      <span className="custom-control-label">&nbsp;</span>
                  </label>
                </td>
                <td><img src="/assets/img/users/4.jpg" className="table-user-thumb" alt="" /></td>
                <td>Cedric Kelly</td>
                <td>Senior Javascript Developer</td>
                <td>Edinburgh</td>
                <td>22</td>
                <td>2012/03/29</td>
                <td>$433,060</td>
              </tr>
              <tr>
                <td>
                  <label className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input select_all_child" id="" name=""
                           value="option2" />
                      <span className="custom-control-label">&nbsp;</span>
                  </label>
                </td>
                <td><img src="/assets/img/users/5.jpg" className="table-user-thumb" alt="" /></td>
                <td>Airi Satou</td>
                <td>Accountant</td>
                <td>Tokyo</td>
                <td>33</td>
                <td>2008/11/28</td>
                <td>$162,700</td>
              </tr>
              <tr>
                <td>
                  <label className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input select_all_child" id="" name=""
                           value="option2" />
                      <span className="custom-control-label">&nbsp;</span>
                  </label>
                </td>
                <td><img src="/assets/img/users/1.jpg" className="table-user-thumb" alt="" /></td>
                <td>Brielle Williamson</td>
                <td>Integration Specialist</td>
                <td>New York</td>
                <td>61</td>
                <td>2012/12/02</td>
                <td>$372,000</td>
              </tr>
              <tr>
                <td>
                  <label className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input select_all_child" id="" name=""
                           value="option2" />
                      <span className="custom-control-label">&nbsp;</span>
                  </label>
                </td>
                <td><img src="/assets/img/users/2.jpg" className="table-user-thumb" alt="" /></td>
                <td>Herrod Chandler</td>
                <td>Sales Assistant</td>
                <td>San Francisco</td>
                <td>59</td>
                <td>2012/08/06</td>
                <td>$137,500</td>
              </tr>
              <tr>
                <td>
                  <label className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input select_all_child" id="" name=""
                           value="option2" />
                      <span className="custom-control-label">&nbsp;</span>
                  </label>
                </td>
                <td><img src="/assets/img/users/3.jpg" className="table-user-thumb" alt="" /></td>
                <td>Rhona Davidson</td>
                <td>Integration Specialist</td>
                <td>Tokyo</td>
                <td>55</td>
                <td>2010/10/14</td>
                <td>$327,900</td>
              </tr>
              <tr>
                <td>
                  <label className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input select_all_child" id="" name=""
                           value="option2" />
                      <span className="custom-control-label">&nbsp;</span>
                  </label>
                </td>
                <td><img src="/assets/img/users/4.jpg" className="table-user-thumb" alt="" /></td>
                <td>Colleen Hurst</td>
                <td>Javascript Developer</td>
                <td>San Francisco</td>
                <td>39</td>
                <td>2009/09/15</td>
                <td>$205,500</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default ClientTransactions;
