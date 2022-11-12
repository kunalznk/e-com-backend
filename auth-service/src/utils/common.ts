import { JsonWebTokenError } from "jsonwebtoken";
import { ValidationError } from "yup"
import { UniqueConstraintError , ValidationError as  DBValidationError } from "sequelize"

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

export const buildFailMessage = (e : Error) => {
  console.log("Error", e)
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
    }
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
  }
  return {
       data : { 
        status : "FAIL",
        message : e.name,
        error
    } ,
    statusCode : 200
    }
}

export const verifyEmailTemplate = (token : string) => {

    const verfiyUrl = `http://localhost:3000/api/v1/verifyEmail/${token}`
    return `<table role="presentation" style="width: 100%; margin: 0px; padding: 10px 0px 0px; background-color: rgb(242, 244, 246); --darkreader-inline-bgcolor: #1e2122;" data-darkreader-inline-bgcolor="" width="100%" cellspacing="0" cellpadding="0">
    <tbody><tr>
      <td style="font-family:Lato,Tahoma,sans-serif;font-size:16px" align="center">
        <table role="presentation" style="width:100%;margin:0;padding:0" width="100%" cellspacing="0" cellpadding="0">
          <tbody><tr>
            <td style="font-family:Lato,Tahoma,sans-serif;font-size:16px;height:25px;width:570px;margin:0 auto">
              <table class="m_8472533597368497227email-body_inner" role="presentation" style="width: 570px; margin: 0px auto; padding: 10px 15px; background: rgb(0, 0, 0); --darkreader-inline-bgcolor: #000000; --darkreader-inline-bgimage: none;" data-darkreader-inline-bgcolor="" data-darkreader-inline-bgimage="" width="570" cellspacing="0" cellpadding="0" align="center">
                <tbody><tr>
                  <td style="font-family:Lato,Tahoma,sans-serif;font-size:16px">
                    <a href="https://codepen.io" style="color: rgb(56, 105, 212); --darkreader-inline-color: #4a8ed8;" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://codepen.io&amp;source=gmail&amp;ust=1668238999271000&amp;usg=AOvVaw27oXmdG5uI9E5J5Pn2qEu8" data-darkreader-inline-color="">
                      <img src="https://ci5.googleusercontent.com/proxy/nybv9hWkgvLh_Xvmcohv9ep_0fQtvAnKNb96DFYClnaMEc-JRGXEHUZijZB4d0-MJ3X_YlZlF3goQ7CTVKIISLnbU1FUjEccZZAqkVBvLvqXTwAHSqagSTw1LUiR-XdDtDBHC35KOpczhJB7rFLV=s0-d-e1-ft#https://res.cloudinary.com/css-tricks/image/upload/f_auto,q_auto/v1583434037/logo_mz4myz.png" alt="CodePen" style="border: medium none; vertical-align: middle; width: 120px; height: auto; --darkreader-inline-border-top: currentcolor; --darkreader-inline-border-right: currentcolor; --darkreader-inline-border-bottom: currentcolor; --darkreader-inline-border-left: currentcolor;" class="CToWUd" data-bit="iit" data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left="">
                    </a>
                  </td>
                </tr>
              </tbody></table>
            </td>
          </tr>
          
          
          <tr>
            <td cellpadding="0" cellspacing="0" style="font-family:Lato,Tahoma,sans-serif;font-size:16px;width:100%;margin:0;padding:0" width="570">
              <table class="m_8472533597368497227email-body_inner" role="presentation" style="width: 570px; margin: 0px auto; padding: 0px; background-color: rgb(255, 255, 255); --darkreader-inline-bgcolor: #181a1b;" data-darkreader-inline-bgcolor="" width="570" cellspacing="0" cellpadding="0" align="center">
                
                
                <tbody><tr>
                  <td style="font-family:Lato,Tahoma,sans-serif;font-size:16px;padding:20px 45px">
                    <div>
                      <h1 style="margin-top: 0px; color: rgb(51, 51, 51); font-size: 24px; font-weight: bold; text-align: left; --darkreader-inline-color: #c8c3bc;" data-darkreader-inline-color="">
Thanks for signing up for CodePen!
</h1>

<p style="color: rgb(81, 84, 94); margin: 0.4em 0px 1.1875em; font-size: 16px; line-height: 1.625; --darkreader-inline-color: #b1aaa0;" data-darkreader-inline-color="">
We're happy you're <span class="il">here</span>. Let's get your <span class="il">email</span> address verified:
</p>

<p style="color: rgb(81, 84, 94); margin: 0.4em 0px 1.1875em; font-size: 16px; line-height: 1.625; --darkreader-inline-color: #b1aaa0;" data-darkreader-inline-color="">
<a href=${verfiyUrl} style="color: rgb(255, 255, 255); background-color: rgb(56, 105, 212); border-color: rgb(56, 105, 212); border-style: solid; border-width: 10px 18px; display: inline-block; text-decoration: none; border-radius: 3px; box-sizing: border-box; --darkreader-inline-color: #e8e6e3; --darkreader-inline-bgcolor: #234ba1; --darkreader-inline-border-top: #1f4290; --darkreader-inline-border-right: #1f4290; --darkreader-inline-border-bottom: #1f4290; --darkreader-inline-border-left: #1f4290;" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://codepen.io/kunalznk/verify/email/Zz8Z97?user_id%3D8775364&amp;source=gmail&amp;ust=1668238999271000&amp;usg=AOvVaw1PGKra0WqE6zkIYuBbvHzq" data-darkreader-inline-color="" data-darkreader-inline-bgcolor="" data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span class="il">Click</span> to <span class="il">Verify</span> <span class="il">Email</span></a>
</p>

<p style="color: rgb(81, 84, 94); margin: 0.4em 0px 1.1875em; font-size: 16px; line-height: 1.625; --darkreader-inline-color: #b1aaa0;" data-darkreader-inline-color="">Verifying your <span class="il">email</span> address enables these features:</p>

<ul style="margin:0.4em 0 1.1875em;font-size:16px;line-height:1.625">
<li><a href="http://blog.codepen.io/documentation/views/full-page-view/" style="color: rgb(56, 105, 212); --darkreader-inline-color: #4a8ed8;" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://blog.codepen.io/documentation/views/full-page-view/&amp;source=gmail&amp;ust=1668238999271000&amp;usg=AOvVaw32pAjsh6Zhu_tOddd-z2I7" data-darkreader-inline-color="">Full Page View</a></li>
<li><a href="https://blog.codepen.io/documentation/features/collections/" style="color: rgb(56, 105, 212); --darkreader-inline-color: #4a8ed8;" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://blog.codepen.io/documentation/features/collections/&amp;source=gmail&amp;ust=1668238999271000&amp;usg=AOvVaw0xASOrH939IgZ75kdy7Iy_" data-darkreader-inline-color="">Collections</a></li>
<li>Commenting on Pens and Projects</li>
<li>Your Pens are searchable on CodePen</li>
</ul>


<h2 style="margin-top: 0px; color: rgb(51, 51, 51); font-size: 20px; font-weight: bold; text-align: left; --darkreader-inline-color: #c8c3bc;" data-darkreader-inline-color="">
Getting Started on CodePen
</h2>

<p style="color: rgb(81, 84, 94); margin: 0.4em 0px 1.1875em; font-size: 16px; line-height: 1.625; --darkreader-inline-color: #b1aaa0;" data-darkreader-inline-color="">
Ready to get coding? <span class="il">Here</span> are a few links to help you!
</p>

<ul style="margin:0.4em 0 1.1875em;font-size:16px;line-height:1.625">
<li><a href="https://codepen.io/hello" style="color: rgb(56, 105, 212); --darkreader-inline-color: #4a8ed8;" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://codepen.io/hello&amp;source=gmail&amp;ust=1668238999271000&amp;usg=AOvVaw2Y6Owiz6-tOA9tBN7aV1Hh" data-darkreader-inline-color="">Quick overview of what you can do with CodePen</a></li>
<li><a href="https://codepen.io/pen/tour/welcome/start" style="color: rgb(56, 105, 212); --darkreader-inline-color: #4a8ed8;" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://codepen.io/pen/tour/welcome/start&amp;source=gmail&amp;ust=1668238999271000&amp;usg=AOvVaw1NmkuIIiKKymTnbD1qWZS9" data-darkreader-inline-color="">Take a guided tour through the Pen editor</a></li>
</ul>


                    </div>
                  </td>
                </tr>
                
              </tbody></table>
            </td>
          </tr>
          <tr>
            <td style="font-family:Lato,Tahoma,sans-serif;font-size:16px">
              <table class="m_8472533597368497227email-footer" role="presentation" style="width:570px;margin:0 auto;padding:0;text-align:center" width="570" cellspacing="0" cellpadding="0" align="center">
                <tbody><tr>
                  <td style="font-family:Lato,Tahoma,sans-serif;font-size:16px;padding:20px 45px" align="center">
                    <p style="color: rgb(111, 112, 115); margin: 0.4em 0px 1.1875em; font-size: 13px; line-height: 1.625; text-align: center; --darkreader-inline-color: #a1988c;" data-darkreader-inline-color="">
                      
                      

                      Need help with anything?
                      Hit up <a href="https://codepen.io/support" style="color: rgb(56, 105, 212); --darkreader-inline-color: #4a8ed8;" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://codepen.io/support&amp;source=gmail&amp;ust=1668238999271000&amp;usg=AOvVaw0kQK07VQtJ5OGf8vo3Hc08" data-darkreader-inline-color="">support</a>.
          
                    </p>
                  </td>
                </tr>
              </tbody></table>
            </td>
          </tr>
        </tbody></table>
      </td>
    </tr>
  </tbody></table>
    `
}
