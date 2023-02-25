import { JsonWebTokenError } from "jsonwebtoken";
import { ValidationError } from "yup"
import { UniqueConstraintError , ValidationError as  DBValidationError } from "sequelize"

export class InvalidDataError extends Error {  
    constructor (message) {
      super(message)
        this.name = message;
        Error.captureStackTrace(this, this.constructor);
        this.path = "auth";
    }
  }

export type Error = JsonWebTokenError | ValidationError | UniqueConstraintError | DBValidationError
export const buildSuccessMessage = (resData : unknown) => {
  return {
        data : {
        status : "SUCCESS",
        data: resData,
    },
    statusCode : 200
  }
}

export const buildFailMessage = (e : Error | unknown) => {
let statusCode: number  = 200;
  console.log("Error",  e)
  let error;
  if(e instanceof ValidationError) {
    error = {
      path: e.path,
      message : e.message
    };
  } else if (e instanceof JsonWebTokenError) {
    error = {
      path: e.stack,
      message: e.message
    };
    // statusCode = 401
  } else if (e instanceof UniqueConstraintError) {
    error = {
      path: e.fields,
      message: Object.keys(e.fields)[0] + " already exists "
    }
  } else if (e instanceof DBValidationError) {
    error = {
      path: e.errors[0]?.path,
      message: e.errors[0]?.message,
    }
  } else if (e instanceof InvalidDataError) {
    error = {
        path: e.path,
        message: e.name
    }
  }
  else {
    error =  e;
  }
  return {
       data : { 
        status : "FAIL",
        message : e?.name,
        error
    },
    statusCode 
    }
}

export const verifyEmailTemplate = (token : string) => {

    const verfiyUrl = `http://localhost:3000/api/v1/verifyEmail/${token}`
    return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tbody><tr>
        <td class="m_2915170658117276425r3-c" align="center">
            <table role="presentation" class="m_2915170658117276425r4-o" style="table-layout:fixed;width:100%" width="100%" cellspacing="0" cellpadding="0" border="0">
                
                <tbody><tr class="m_2915170658117276425nl2go-responsive-hide">
                    <td style="font-size: 20px; line-height: 20px; background-color: rgb(17, 25, 39); --darkreader-inline-bgcolor: #0e141f;" data-darkreader-inline-bgcolor="" height="20">­</td>
                </tr>
                <tr>
                    <td class="m_2915170658117276425r5-i" style="background-color: rgb(17, 25, 39); --darkreader-inline-bgcolor: #0e141f;" data-darkreader-inline-bgcolor="">
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                            <tbody><tr>
                                <th class="m_2915170658117276425r6-c" width="100%" valign="top">
                                    <table role="presentation" class="m_2915170658117276425r7-o" style="table-layout:fixed;width:100%" width="100%" cellspacing="0" cellpadding="0" border="0">
                                        
                                        <tbody><tr>
                                            <td class="m_2915170658117276425nl2go-responsive-hide" style="font-size:0px;line-height:1px" width="15">­ </td>
                                            <td class="m_2915170658117276425r8-i" valign="top">
                                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                                    <tbody><tr>
                                                        <td class="m_2915170658117276425r9-c" align="center">
                                                            <table role="presentation" class="m_2915170658117276425r10-o" style="table-layout:fixed;width:285px" width="285" cellspacing="0" cellpadding="0" border="0">
                                                                <tbody><tr class="m_2915170658117276425nl2go-responsive-hide">
                                                                    <td style="font-size:15px;line-height:15px" height="15">­</td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="m_2915170658117276425r11-i" style="font-size:0px;line-height:0px"> <img src="https://ci6.googleusercontent.com/proxy/eh8Dka3qrjhwqiVBNko2haJH2BOHjhKJ6rUwUZ4SRPLA7BUE9ynEnFCw_dNBOoQijw7vOqlyLtKkEptMa7OTHGhFNEzhMMst6Qov9jxYU7BmexMfJSD64FIn_NXk7llFvdrgJjmfJcNfkUhVPa3mP5_2=s0-d-e1-ft#https://img.mailinblue.com/3579920/images/content_library/original/620b8836d79b114a07097f02.png" style="display:block;width:100%" class="CToWUd" data-bit="iit" width="285" border="0"></td>
                                                                </tr>
                                                                <tr class="m_2915170658117276425nl2go-responsive-hide">
                                                                    <td style="font-size:15px;line-height:15px" height="15">­</td>
                                                                </tr>
                                                            </tbody></table>
                                                        </td>
                                                    </tr>
                                                </tbody></table>
                                            </td>
                                            <td class="m_2915170658117276425nl2go-responsive-hide" style="font-size:0px;line-height:1px" width="15">­ </td>
                                        </tr>
                                    </tbody></table>
                                </th>
                            </tr>
                        </tbody></table>
                    </td>
                </tr>
                <tr class="m_2915170658117276425nl2go-responsive-hide">
                    <td style="font-size: 10px; line-height: 10px; background-color: rgb(17, 25, 39); --darkreader-inline-bgcolor: #0e141f;" data-darkreader-inline-bgcolor="" height="10">­</td>
                </tr>
            </tbody></table>
        </td>
    </tr>
    <tr>
        <td class="m_2915170658117276425r3-c" align="center">
            <table role="presentation" class="m_2915170658117276425r4-o" style="table-layout:fixed;width:100%" width="100%" cellspacing="0" cellpadding="0" border="0">
                
                <tbody><tr class="m_2915170658117276425nl2go-responsive-hide">
                    <td style="font-size: 20px; line-height: 20px; background-color: rgb(17, 25, 39); --darkreader-inline-bgcolor: #0e141f;" data-darkreader-inline-bgcolor="" height="20">­</td>
                </tr>
                <tr>
                    <td class="m_2915170658117276425r12-i" style="background-color: rgb(17, 25, 39); --darkreader-inline-bgcolor: #0e141f;" data-darkreader-inline-bgcolor="">
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                            <tbody><tr>
                                <th class="m_2915170658117276425r6-c" width="100%" valign="top">
                                    <table role="presentation" class="m_2915170658117276425r7-o" style="table-layout:fixed;width:100%" width="100%" cellspacing="0" cellpadding="0" border="0">
                                        
                                        <tbody><tr>
                                            <td class="m_2915170658117276425nl2go-responsive-hide" style="font-size:0px;line-height:1px" width="15">­ </td>
                                            <td class="m_2915170658117276425r8-i" valign="top">
                                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                                    <tbody><tr>
                                                        <td class="m_2915170658117276425r13-c" align="left">
                                                            <table role="presentation" class="m_2915170658117276425r14-o" style="table-layout:fixed;width:100%" width="100%" cellspacing="0" cellpadding="0" border="0">
                                                                <tbody><tr class="m_2915170658117276425nl2go-responsive-hide">
                                                                    <td style="font-size:15px;line-height:15px" height="15">­</td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="m_2915170658117276425r15-i" style="color: rgb(164, 177, 205); font-family: arial, helvetica, sans-serif; font-size: 16px; line-height: 1.7; text-align: center; --darkreader-inline-color: #9eb3ca;" data-darkreader-inline-color="" valign="top" align="center">
                                                                        <div>
                                                                            <h1 style="color: rgb(159, 239, 0); font-family: arial, helvetica, sans-serif; font-size: 36px; margin: 0px; --darkreader-inline-color: #b6ff25;" data-darkreader-inline-color=""><span style="font-size:28px"><span class="il">Verify</span> <span class="il">your</span> email <img data-emoji="📩" class="an1" alt="📩" aria-label="📩" src="https://fonts.gstatic.com/s/e/notoemoji/15.0/1f4e9/32.png" loading="lazy"></span></h1>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody></table>
                                                        </td>
                                                    </tr>
                                                </tbody></table>
                                            </td>
                                            <td class="m_2915170658117276425nl2go-responsive-hide" style="font-size:0px;line-height:1px" width="15">­ </td>
                                        </tr>
                                    </tbody></table>
                                </th>
                            </tr>
                        </tbody></table>
                    </td>
                </tr>
            </tbody></table>
        </td>
    </tr>
    <tr>
        <td class="m_2915170658117276425r3-c" align="center">
            <table role="presentation" class="m_2915170658117276425r4-o" style="table-layout:fixed;width:100%" width="100%" cellspacing="0" cellpadding="0" border="0">
                
                <tbody><tr class="m_2915170658117276425nl2go-responsive-hide">
                    <td style="font-size: 20px; line-height: 20px; background-color: rgb(17, 25, 39); --darkreader-inline-bgcolor: #0e141f;" data-darkreader-inline-bgcolor="" height="20">­</td>
                </tr>
                <tr>
                    <td class="m_2915170658117276425r12-i" style="background-color: rgb(17, 25, 39); --darkreader-inline-bgcolor: #0e141f;" data-darkreader-inline-bgcolor="">
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                            <tbody><tr>
                                <th class="m_2915170658117276425r6-c" width="100%" valign="top">
                                    <table role="presentation" class="m_2915170658117276425r7-o" style="table-layout:fixed;width:100%" width="100%" cellspacing="0" cellpadding="0" border="0">
                                        
                                        <tbody><tr>
                                            <td class="m_2915170658117276425nl2go-responsive-hide" style="font-size:0px;line-height:1px" width="10">­ </td>
                                            <td class="m_2915170658117276425r8-i" valign="top">
                                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                                    <tbody><tr>
                                                        <td class="m_2915170658117276425r13-c" align="left">
                                                            <table role="presentation" class="m_2915170658117276425r14-o" style="table-layout:fixed;width:100%" width="100%" cellspacing="0" cellpadding="0" border="0">
                                                                <tbody><tr class="m_2915170658117276425nl2go-responsive-hide">
                                                                    <td style="font-size:15px;line-height:15px" height="15">­</td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="m_2915170658117276425r16-i" style="color: rgb(164, 177, 205); font-family: arial, helvetica, sans-serif; font-size: 16px; line-height: 1.7; text-align: center; --darkreader-inline-color: #9eb3ca;" data-darkreader-inline-color="" valign="top" align="center">
                                                                        <div>
                                                                            <p style="margin:0px">Please click the button below to <span class="il">verify</span> <span class="il">your</span> e-mail address.</p>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr class="m_2915170658117276425nl2go-responsive-hide">
                                                                    <td style="font-size:15px;line-height:15px" height="15">­</td>
                                                                </tr>
                                                            </tbody></table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="m_2915170658117276425r3-c" align="center">
                                                            <table role="presentation" class="m_2915170658117276425r17-o" style="table-layout:fixed;width:290px" width="290" cellspacing="0" cellpadding="0" border="0">
                                                                <tbody><tr class="m_2915170658117276425nl2go-responsive-hide">
                                                                    <td style="font-size:15px;line-height:15px" height="15">­</td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="m_2915170658117276425r18-i" style="color: rgb(164, 177, 205); font-family: arial, helvetica, sans-serif; font-size: 16px; line-height: 1.7; --darkreader-inline-color: #9eb3ca;" data-darkreader-inline-color="" valign="top" height="18" align="center">
                                                                          
                                                                        <a href=${verfiyUrl} class="m_2915170658117276425r19-r" style="font-weight: normal; line-height: 1.15; text-decoration: none; border-style: solid; display: inline-block; background-color: rgb(159, 239, 0); border-color: rgb(159, 239, 0); border-radius: 4px; border-width: 0px; color: rgb(17, 25, 39); font-family: arial, helvetica, sans-serif; font-size: 16px; height: 18px; padding: 12px 5px; width: 280px; --darkreader-inline-bgcolor: #7fbf00; --darkreader-inline-border-top: #7ab700; --darkreader-inline-border-right: #7ab700; --darkreader-inline-border-bottom: #7ab700; --darkreader-inline-border-left: #7ab700; --darkreader-inline-color: #d6d3cd;" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://academy.hackthebox.com/email/verify/553181/5d8fe72645526e875e7c28d320d6f6b60914b93e?expires%3D1658427606%26signature%3D84faafcaaa22ece153d5940d9185c5c169f7120b4f0822619cde12edb6b575b5&amp;source=gmail&amp;ust=1668401904275000&amp;usg=AOvVaw2cUHGCf9wzkJu6s087PBAW" data-darkreader-inline-bgcolor="" data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left="" data-darkreader-inline-color="">
                                                                            <p style="margin:0px"><span class="il">Verify</span> Email Adress</p>
                                                                        </a>
                                                                        
                                                                    </td>
                                                                </tr>
                                                                <tr class="m_2915170658117276425nl2go-responsive-hide">
                                                                    <td style="font-size:15px;line-height:15px" height="15">­</td>
                                                                </tr>
                                                            </tbody></table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="m_2915170658117276425r13-c" align="left">
                                                            <table role="presentation" class="m_2915170658117276425r14-o" style="table-layout:fixed;width:100%" width="100%" cellspacing="0" cellpadding="0" border="0">
                                                                <tbody><tr class="m_2915170658117276425nl2go-responsive-hide">
                                                                    <td style="font-size:15px;line-height:15px" height="15">­</td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="m_2915170658117276425r16-i" style="color: rgb(164, 177, 205); font-family: arial, helvetica, sans-serif; font-size: 16px; line-height: 1.7; text-align: center; --darkreader-inline-color: #9eb3ca;" data-darkreader-inline-color="" valign="top" align="center">
                                                                        <div>
                                                                            <p style="margin:0px">If you did not create an <span class="il">account</span>, no further action is required.</p>
                                                                            <p style="margin:0px"> </p>
                                                                            <p style="margin:0px">If you're having trouble clicking the "<span class="il">Verify</span> Email Address" button, copy and paste the URL below into <span class="il">your</span> web browser:</p>
                                                                            <p style="margin:0px"> </p>
                                                                            <p style="margin:0px"><a href=${verfiyUrl} target="_blank" data-saferedirecturl=${verfiyUrl}>${verfiyUrl}</a></p>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr class="m_2915170658117276425nl2go-responsive-hide">
                                                                    <td style="font-size:15px;line-height:15px" height="15">­</td>
                                                                </tr>
                                                            </tbody></table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="m_2915170658117276425r13-c" align="left">
                                                            <table role="presentation" class="m_2915170658117276425r14-o" style="table-layout:fixed;width:100%" width="100%" cellspacing="0" cellpadding="0" border="0">
                                                                <tbody><tr class="m_2915170658117276425nl2go-responsive-hide">
                                                                    <td style="font-size:15px;line-height:15px" height="15">­</td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="m_2915170658117276425r16-i" style="color: rgb(164, 177, 205); font-family: arial, helvetica, sans-serif; font-size: 16px; line-height: 1.7; text-align: center; --darkreader-inline-color: #9eb3ca;" data-darkreader-inline-color="" valign="top" align="center">
                                                                        <div>
                                                                            <p style="margin:0px"><span style="color: rgb(164, 177, 205); --darkreader-inline-color: #9eb3ca;" data-darkreader-inline-color="">Also, don't forget to join the <img data-emoji="💚" class="an1" alt="💚" aria-label="💚" src="https://fonts.gstatic.com/s/e/notoemoji/15.0/1f49a/32.png" loading="lazy"> of our community: our</span><span style="color: rgb(133, 133, 136); --darkreader-inline-color: #9c9386;" data-darkreader-inline-color=""> </span><a href="https://discord.com/invite/hackthebox?utm_source=sendinblue&amp;utm_campaign=Academy%20Email%20Verification%20Revamp&amp;utm_medium=email" style="color: rgb(159, 239, 0); font-weight: normal; text-decoration: none; --darkreader-inline-color: #b6ff25;" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://discord.com/invite/hackthebox?utm_source%3Dsendinblue%26utm_campaign%3DAcademy%2520Email%2520Verification%2520Revamp%26utm_medium%3Demail&amp;source=gmail&amp;ust=1668401904275000&amp;usg=AOvVaw2BTvJMSD6Ntr0mWtxoKPf7" data-darkreader-inline-color=""><span style="color: rgb(159, 239, 0); --darkreader-inline-color: #b6ff25;" data-darkreader-inline-color="">Discord server</span></a><span style="color: rgb(159, 239, 0); --darkreader-inline-color: #b6ff25;" data-darkreader-inline-color="">!</span></p>
                                                                            <p style="margin:0px"><span style="color: rgb(164, 177, 205); --darkreader-inline-color: #9eb3ca;" data-darkreader-inline-color="">If you experience any problem, make sure to check our </span><a href="https://help.hackthebox.com/en/?utm_source=sendinblue&amp;utm_campaign=Academy%20Email%20Verification%20Revamp&amp;utm_medium=email" style="color: rgb(159, 239, 0); font-weight: normal; text-decoration: none; --darkreader-inline-color: #b6ff25;" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://help.hackthebox.com/en/?utm_source%3Dsendinblue%26utm_campaign%3DAcademy%2520Email%2520Verification%2520Revamp%26utm_medium%3Demail&amp;source=gmail&amp;ust=1668401904275000&amp;usg=AOvVaw0mE6scoWar6VXHlCFcP8bj" data-darkreader-inline-color=""><span style="color: rgb(159, 239, 0); --darkreader-inline-color: #b6ff25;" data-darkreader-inline-color="">Knowledge Base</span></a><span style="color: rgb(164, 177, 205); --darkreader-inline-color: #9eb3ca;" data-darkreader-inline-color="">.</span></p>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr class="m_2915170658117276425nl2go-responsive-hide">
                                                                    <td style="font-size:15px;line-height:15px" height="15">­</td>
                                                                </tr>
                                                            </tbody></table>
                                                        </td>
                                                    </tr>
                                                </tbody></table>
                                            </td>
                                            <td class="m_2915170658117276425nl2go-responsive-hide" style="font-size:0px;line-height:1px" width="10">­ </td>
                                        </tr>
                                    </tbody></table>
                                </th>
                            </tr>
                        </tbody></table>
                    </td>
                </tr>
            </tbody></table>
        </td>
    </tr>
</tbody></table>`
}

export const ResetPasswordEmailTemplate = (token : string) => {

    const resetPassowrdUrl = `http://localhost:3000/api/v1/resetpassword/${token}`
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
  <tbody><tr>
      <td class="m_2915170658117276425r3-c" align="center">
          <table role="presentation" class="m_2915170658117276425r4-o" style="table-layout:fixed;width:100%" width="100%" cellspacing="0" cellpadding="0" border="0">
              
              <tbody><tr class="m_2915170658117276425nl2go-responsive-hide">
                  <td style="font-size: 20px; line-height: 20px; background-color: rgb(17, 25, 39); --darkreader-inline-bgcolor: #0e141f;" data-darkreader-inline-bgcolor="" height="20">­</td>
              </tr>
              <tr>
                  <td class="m_2915170658117276425r5-i" style="background-color: rgb(17, 25, 39); --darkreader-inline-bgcolor: #0e141f;" data-darkreader-inline-bgcolor="">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                          <tbody><tr>
                              <th class="m_2915170658117276425r6-c" width="100%" valign="top">
                                  <table role="presentation" class="m_2915170658117276425r7-o" style="table-layout:fixed;width:100%" width="100%" cellspacing="0" cellpadding="0" border="0">
                                      
                                      <tbody><tr>
                                          <td class="m_2915170658117276425nl2go-responsive-hide" style="font-size:0px;line-height:1px" width="15">­ </td>
                                          <td class="m_2915170658117276425r8-i" valign="top">
                                              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                                  <tbody><tr>
                                                      <td class="m_2915170658117276425r9-c" align="center">
                                                          <table role="presentation" class="m_2915170658117276425r10-o" style="table-layout:fixed;width:285px" width="285" cellspacing="0" cellpadding="0" border="0">
                                                              <tbody><tr class="m_2915170658117276425nl2go-responsive-hide">
                                                                  <td style="font-size:15px;line-height:15px" height="15">­</td>
                                                              </tr>
                                                              <tr>
                                                                  <td class="m_2915170658117276425r11-i" style="font-size:0px;line-height:0px"> <img src="https://ci6.googleusercontent.com/proxy/eh8Dka3qrjhwqiVBNko2haJH2BOHjhKJ6rUwUZ4SRPLA7BUE9ynEnFCw_dNBOoQijw7vOqlyLtKkEptMa7OTHGhFNEzhMMst6Qov9jxYU7BmexMfJSD64FIn_NXk7llFvdrgJjmfJcNfkUhVPa3mP5_2=s0-d-e1-ft#https://img.mailinblue.com/3579920/images/content_library/original/620b8836d79b114a07097f02.png" style="display:block;width:100%" class="CToWUd" data-bit="iit" width="285" border="0"></td>
                                                              </tr>
                                                              <tr class="m_2915170658117276425nl2go-responsive-hide">
                                                                  <td style="font-size:15px;line-height:15px" height="15">­</td>
                                                              </tr>
                                                          </tbody></table>
                                                      </td>
                                                  </tr>
                                              </tbody></table>
                                          </td>
                                          <td class="m_2915170658117276425nl2go-responsive-hide" style="font-size:0px;line-height:1px" width="15">­ </td>
                                      </tr>
                                  </tbody></table>
                              </th>
                          </tr>
                      </tbody></table>
                  </td>
              </tr>
              <tr class="m_2915170658117276425nl2go-responsive-hide">
                  <td style="font-size: 10px; line-height: 10px; background-color: rgb(17, 25, 39); --darkreader-inline-bgcolor: #0e141f;" data-darkreader-inline-bgcolor="" height="10">­</td>
              </tr>
          </tbody></table>
      </td>
  </tr>
  <tr>
      <td class="m_2915170658117276425r3-c" align="center">
          <table role="presentation" class="m_2915170658117276425r4-o" style="table-layout:fixed;width:100%" width="100%" cellspacing="0" cellpadding="0" border="0">
              
              <tbody><tr class="m_2915170658117276425nl2go-responsive-hide">
                  <td style="font-size: 20px; line-height: 20px; background-color: rgb(17, 25, 39); --darkreader-inline-bgcolor: #0e141f;" data-darkreader-inline-bgcolor="" height="20">­</td>
              </tr>
              <tr>
                  <td class="m_2915170658117276425r12-i" style="background-color: rgb(17, 25, 39); --darkreader-inline-bgcolor: #0e141f;" data-darkreader-inline-bgcolor="">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                          <tbody><tr>
                              <th class="m_2915170658117276425r6-c" width="100%" valign="top">
                                  <table role="presentation" class="m_2915170658117276425r7-o" style="table-layout:fixed;width:100%" width="100%" cellspacing="0" cellpadding="0" border="0">
                                      
                                      <tbody><tr>
                                          <td class="m_2915170658117276425nl2go-responsive-hide" style="font-size:0px;line-height:1px" width="15">­ </td>
                                          <td class="m_2915170658117276425r8-i" valign="top">
                                              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                                  <tbody><tr>
                                                      <td class="m_2915170658117276425r13-c" align="left">
                                                          <table role="presentation" class="m_2915170658117276425r14-o" style="table-layout:fixed;width:100%" width="100%" cellspacing="0" cellpadding="0" border="0">
                                                              <tbody><tr class="m_2915170658117276425nl2go-responsive-hide">
                                                                  <td style="font-size:15px;line-height:15px" height="15">­</td>
                                                              </tr>
                                                              <tr>
                                                                  <td class="m_2915170658117276425r15-i" style="color: rgb(164, 177, 205); font-family: arial, helvetica, sans-serif; font-size: 16px; line-height: 1.7; text-align: center; --darkreader-inline-color: #9eb3ca;" data-darkreader-inline-color="" valign="top" align="center">
                                                                      <div>
                                                                          <h1 style="color: rgb(159, 239, 0); font-family: arial, helvetica, sans-serif; font-size: 36px; margin: 0px; --darkreader-inline-color: #b6ff25;" data-darkreader-inline-color=""><span style="font-size:28px"><span class="il">Reset</span> <span class="il">your</span> password <img data-emoji="📩" class="an1" alt="📩" aria-label="📩" src="https://fonts.gstatic.com/s/e/notoemoji/15.0/1f4e9/32.png" loading="lazy"></span></h1>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                          </tbody></table>
                                                      </td>
                                                  </tr>
                                              </tbody></table>
                                          </td>
                                          <td class="m_2915170658117276425nl2go-responsive-hide" style="font-size:0px;line-height:1px" width="15">­ </td>
                                      </tr>
                                  </tbody></table>
                              </th>
                          </tr>
                      </tbody></table>
                  </td>
              </tr>
          </tbody></table>
      </td>
  </tr>
  <tr>
      <td class="m_2915170658117276425r3-c" align="center">
          <table role="presentation" class="m_2915170658117276425r4-o" style="table-layout:fixed;width:100%" width="100%" cellspacing="0" cellpadding="0" border="0">
              
              <tbody><tr class="m_2915170658117276425nl2go-responsive-hide">
                  <td style="font-size: 20px; line-height: 20px; background-color: rgb(17, 25, 39); --darkreader-inline-bgcolor: #0e141f;" data-darkreader-inline-bgcolor="" height="20">­</td>
              </tr>
              <tr>
                  <td class="m_2915170658117276425r12-i" style="background-color: rgb(17, 25, 39); --darkreader-inline-bgcolor: #0e141f;" data-darkreader-inline-bgcolor="">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                          <tbody><tr>
                              <th class="m_2915170658117276425r6-c" width="100%" valign="top">
                                  <table role="presentation" class="m_2915170658117276425r7-o" style="table-layout:fixed;width:100%" width="100%" cellspacing="0" cellpadding="0" border="0">
                                      
                                      <tbody><tr>
                                          <td class="m_2915170658117276425nl2go-responsive-hide" style="font-size:0px;line-height:1px" width="10">­ </td>
                                          <td class="m_2915170658117276425r8-i" valign="top">
                                              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                                  <tbody><tr>
                                                      <td class="m_2915170658117276425r13-c" align="left">
                                                          <table role="presentation" class="m_2915170658117276425r14-o" style="table-layout:fixed;width:100%" width="100%" cellspacing="0" cellpadding="0" border="0">
                                                              <tbody><tr class="m_2915170658117276425nl2go-responsive-hide">
                                                                  <td style="font-size:15px;line-height:15px" height="15">­</td>
                                                              </tr>
                                                              <tr>
                                                                  <td class="m_2915170658117276425r16-i" style="color: rgb(164, 177, 205); font-family: arial, helvetica, sans-serif; font-size: 16px; line-height: 1.7; text-align: center; --darkreader-inline-color: #9eb3ca;" data-darkreader-inline-color="" valign="top" align="center">
                                                                      <div>
                                                                          <p style="margin:0px">Please click the button below to <span class="il">reset</span> <span class="il">your</span> password</p>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                              <tr class="m_2915170658117276425nl2go-responsive-hide">
                                                                  <td style="font-size:15px;line-height:15px" height="15">­</td>
                                                              </tr>
                                                          </tbody></table>
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td class="m_2915170658117276425r3-c" align="center">
                                                          <table role="presentation" class="m_2915170658117276425r17-o" style="table-layout:fixed;width:290px" width="290" cellspacing="0" cellpadding="0" border="0">
                                                              <tbody><tr class="m_2915170658117276425nl2go-responsive-hide">
                                                                  <td style="font-size:15px;line-height:15px" height="15">­</td>
                                                              </tr>
                                                              <tr>
                                                                  <td class="m_2915170658117276425r18-i" style="color: rgb(164, 177, 205); font-family: arial, helvetica, sans-serif; font-size: 16px; line-height: 1.7; --darkreader-inline-color: #9eb3ca;" data-darkreader-inline-color="" valign="top" height="18" align="center">
                                                                        
                                                                      <a href=${resetPassowrdUrl} class="m_2915170658117276425r19-r" style="font-weight: normal; line-height: 1.15; text-decoration: none; border-style: solid; display: inline-block; background-color: rgb(159, 239, 0); border-color: rgb(159, 239, 0); border-radius: 4px; border-width: 0px; color: rgb(17, 25, 39); font-family: arial, helvetica, sans-serif; font-size: 16px; height: 18px; padding: 12px 5px; width: 280px; --darkreader-inline-bgcolor: #7fbf00; --darkreader-inline-border-top: #7ab700; --darkreader-inline-border-right: #7ab700; --darkreader-inline-border-bottom: #7ab700; --darkreader-inline-border-left: #7ab700; --darkreader-inline-color: #d6d3cd;" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://academy.hackthebox.com/email/verify/553181/5d8fe72645526e875e7c28d320d6f6b60914b93e?expires%3D1658427606%26signature%3D84faafcaaa22ece153d5940d9185c5c169f7120b4f0822619cde12edb6b575b5&amp;source=gmail&amp;ust=1668401904275000&amp;usg=AOvVaw2cUHGCf9wzkJu6s087PBAW" data-darkreader-inline-bgcolor="" data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left="" data-darkreader-inline-color="">
                                                                          <p style="margin:0px"><span class="il">Reset</span> Password</p>
                                                                      </a>
                                                                      
                                                                  </td>
                                                              </tr>
                                                              <tr class="m_2915170658117276425nl2go-responsive-hide">
                                                                  <td style="font-size:15px;line-height:15px" height="15">­</td>
                                                              </tr>
                                                          </tbody></table>
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td class="m_2915170658117276425r13-c" align="left">
                                                          <table role="presentation" class="m_2915170658117276425r14-o" style="table-layout:fixed;width:100%" width="100%" cellspacing="0" cellpadding="0" border="0">
                                                              <tbody><tr class="m_2915170658117276425nl2go-responsive-hide">
                                                                  <td style="font-size:15px;line-height:15px" height="15">­</td>
                                                              </tr>
                                                              <tr>
                                                                  <td class="m_2915170658117276425r16-i" style="color: rgb(164, 177, 205); font-family: arial, helvetica, sans-serif; font-size: 16px; line-height: 1.7; text-align: center; --darkreader-inline-color: #9eb3ca;" data-darkreader-inline-color="" valign="top" align="center">
                                                                      <div>
                                                                          <p style="margin:0px">If you did not create an <span class="il">account</span>, no further action is required.</p>
                                                                          <p style="margin:0px"> </p>
                                                                          <p style="margin:0px">If you're having trouble clicking the "<span class="il">Reset</span> Password" button, copy and paste the URL below into <span class="il">your</span> web browser:</p>
                                                                          <p style="margin:0px"> </p>
                                                                          <p style="margin:0px"><a href=${resetPassowrdUrl} target="_blank" data-saferedirecturl=${resetPassowrdUrl}>${resetPassowrdUrl}</a></p>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                              <tr class="m_2915170658117276425nl2go-responsive-hide">
                                                                  <td style="font-size:15px;line-height:15px" height="15">­</td>
                                                              </tr>
                                                          </tbody></table>
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td class="m_2915170658117276425r13-c" align="left">
                                                          <table role="presentation" class="m_2915170658117276425r14-o" style="table-layout:fixed;width:100%" width="100%" cellspacing="0" cellpadding="0" border="0">
                                                              <tbody><tr class="m_2915170658117276425nl2go-responsive-hide">
                                                                  <td style="font-size:15px;line-height:15px" height="15">­</td>
                                                              </tr>
                                                              <tr>
                                                                  <td class="m_2915170658117276425r16-i" style="color: rgb(164, 177, 205); font-family: arial, helvetica, sans-serif; font-size: 16px; line-height: 1.7; text-align: center; --darkreader-inline-color: #9eb3ca;" data-darkreader-inline-color="" valign="top" align="center">
                                                                      <div>
                                                                          <p style="margin:0px"><span style="color: rgb(164, 177, 205); --darkreader-inline-color: #9eb3ca;" data-darkreader-inline-color="">Also, don't forget to join the <img data-emoji="💚" class="an1" alt="💚" aria-label="💚" src="https://fonts.gstatic.com/s/e/notoemoji/15.0/1f49a/32.png" loading="lazy"> of our community: our</span><span style="color: rgb(133, 133, 136); --darkreader-inline-color: #9c9386;" data-darkreader-inline-color=""> </span><a href="https://discord.com/invite/hackthebox?utm_source=sendinblue&amp;utm_campaign=Academy%20Email%20Verification%20Revamp&amp;utm_medium=email" style="color: rgb(159, 239, 0); font-weight: normal; text-decoration: none; --darkreader-inline-color: #b6ff25;" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://discord.com/invite/hackthebox?utm_source%3Dsendinblue%26utm_campaign%3DAcademy%2520Email%2520Verification%2520Revamp%26utm_medium%3Demail&amp;source=gmail&amp;ust=1668401904275000&amp;usg=AOvVaw2BTvJMSD6Ntr0mWtxoKPf7" data-darkreader-inline-color=""><span style="color: rgb(159, 239, 0); --darkreader-inline-color: #b6ff25;" data-darkreader-inline-color="">Discord server</span></a><span style="color: rgb(159, 239, 0); --darkreader-inline-color: #b6ff25;" data-darkreader-inline-color="">!</span></p>
                                                                          <p style="margin:0px"><span style="color: rgb(164, 177, 205); --darkreader-inline-color: #9eb3ca;" data-darkreader-inline-color="">If you experience any problem, make sure to check our </span><a href="https://help.hackthebox.com/en/?utm_source=sendinblue&amp;utm_campaign=Academy%20Email%20Verification%20Revamp&amp;utm_medium=email" style="color: rgb(159, 239, 0); font-weight: normal; text-decoration: none; --darkreader-inline-color: #b6ff25;" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://help.hackthebox.com/en/?utm_source%3Dsendinblue%26utm_campaign%3DAcademy%2520Email%2520Verification%2520Revamp%26utm_medium%3Demail&amp;source=gmail&amp;ust=1668401904275000&amp;usg=AOvVaw0mE6scoWar6VXHlCFcP8bj" data-darkreader-inline-color=""><span style="color: rgb(159, 239, 0); --darkreader-inline-color: #b6ff25;" data-darkreader-inline-color="">Knowledge Base</span></a><span style="color: rgb(164, 177, 205); --darkreader-inline-color: #9eb3ca;" data-darkreader-inline-color="">.</span></p>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                              <tr class="m_2915170658117276425nl2go-responsive-hide">
                                                                  <td style="font-size:15px;line-height:15px" height="15">­</td>
                                                              </tr>
                                                          </tbody></table>
                                                      </td>
                                                  </tr>
                                              </tbody></table>
                                          </td>
                                          <td class="m_2915170658117276425nl2go-responsive-hide" style="font-size:0px;line-height:1px" width="10">­ </td>
                                      </tr>
                                  </tbody></table>
                              </th>
                          </tr>
                      </tbody></table>
                  </td>
              </tr>
          </tbody></table>
      </td>
  </tr>
</tbody></table>`
}