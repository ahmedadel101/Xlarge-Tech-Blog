/*--------------------- Copyright (c) 2018 -----------------------
[Master Javascript]
Project: Wlog - Blog and Magazine HTML template 
Version: 1.0.0
Assigned to: Theme Forest
-------------------------------------------------------------------*/

import { getAllPosts, deletePost, getNotApprovedPosts,
        ApprovePost, getSubCategories, addSubCategory} from './posts.js'
import { getAllUsers, getUserById,  getAllAdmins, delUserOrAdmin, addAdmin } from './users.js'


let addAdminForm = document.getElementById('addAdminForm');
let userTable    = document.getElementById('userTable');
let adminTable   = document.getElementById('adminTable');
let postsList    = document.getElementById('postsList');
let notApprovedPosts = document.getElementById('notApprovedPosts');
let profileInfo = document.getElementById('profileInfo');
let categorySelectElm = document.getElementById('select-category');
let categoriesList    = document.getElementById('categoriesList');
const addSubCateForm = document.getElementById('addSubCateForm');




// Get user token from session storage
let userToken = JSON.parse(sessionStorage.getItem('userToken'));
let userData = JSON.parse(sessionStorage.getItem('userData'));
let userId = userData._id;
// let userName = userData.name;
// let userImg = userData.img;
// let userCountry = userData.country;
// let userAge = userData.Age;
// let userAbout = userData.about;


// Get All Posts
getAllPosts(displayAllPosts);
// Get Not approved posts
getNotApprovedPosts(displayNotApprovedPosts);
// Approve Post
ApprovePost(displayAllPosts, displayNotApprovedPosts, notApprovedPosts)
// Delete Post
deletePost(displayAllPosts, postsList);
// Get All Admins
getAllAdmins(displayAllAdmins);
// Add New Admin
addAdmin(displayAllAdmins, addAdminForm);
// Delete All Admins
delUserOrAdmin(displayAllAdmins, adminTable, 'admin');
// Delete All Users
delUserOrAdmin(displayAllUsers, userTable, 'user');
// Get All Users
getAllUsers(displayAllUsers);
// // Get Profile Data 
getUserById(userId, 'admin', userToken, displayUserData);
// Get subCategories
getSubCategories(displaySubCategories, categorySelectElm);

// Add Sub Category
addSubCategory(addSubCateForm)


// Display All Posts
function displayAllPosts(posts) {
    let temp = '';
    let content;
    for(const[i, post] of posts.entries()) {
        if (post.content.length > 100) {

            content = post.content.substring(1, 100)            
        }
        
        temp+=`<div class="blog_post_style2">
        <div class="blog_post_style2_img">
            <img src="${post.img}" class="img-fluid" alt="">
        </div>
        <div class="blog_post_style2_content">
            <h3><a href="blog_single_with_sidebar.html">${post.title}</a></h3>
            <div class="blog_author_data">
            <a href="#">
            <img src="${post.createdby.img}" class="img-fluid" alt="" width="34" height="34">${post.createdby.name}</a></div> 
            <ul class="blog_meta_tags">
                <li>
                <span class="blog_bg_blue"><svg xmlns="http://www.w3.org/2000/svg" width="12px" height="7px"><path fill-rule="evenodd"  fill="rgb(255, 255, 255)" d="M11.829,3.074 C11.732,2.948 9.422,-0.000 6.468,-0.000 C3.514,-0.000 1.203,2.948 1.106,3.074 C0.916,3.320 0.916,3.678 1.106,3.925 C1.203,4.050 3.514,6.999 6.468,6.999 C9.422,6.999 11.732,4.050 11.829,3.925 C12.020,3.678 12.020,3.320 11.829,3.074 ZM7.370,1.771 C7.569,1.651 7.846,1.788 7.989,2.077 C8.132,2.366 8.087,2.696 7.888,2.816 C7.689,2.936 7.412,2.799 7.269,2.510 C7.126,2.221 7.171,1.890 7.370,1.771 ZM6.468,5.930 C4.404,5.930 2.668,4.183 2.067,3.499 C2.473,3.037 3.397,2.091 4.589,1.525 C4.357,1.915 4.220,2.381 4.220,2.883 C4.220,4.251 5.227,5.360 6.468,5.360 C7.709,5.360 8.715,4.251 8.715,2.883 C8.715,2.381 8.579,1.915 8.346,1.525 C9.539,2.091 10.463,3.037 10.869,3.499 C10.268,4.184 8.531,5.930 6.468,5.930 Z"/></svg> ${post.views}</span></li> 
                <li><span class="blog_bg_pink"><svg xmlns="http://www.w3.org/2000/svg" width="13px" height="10px"><path fill-rule="evenodd"  fill="rgb(255, 255, 255)" d="M12.485,7.049 C12.142,7.544 11.670,7.962 11.070,8.303 C11.119,8.417 11.168,8.520 11.219,8.615 C11.270,8.710 11.330,8.801 11.401,8.889 C11.471,8.977 11.525,9.045 11.564,9.095 C11.603,9.145 11.665,9.214 11.752,9.305 C11.840,9.394 11.895,9.453 11.919,9.482 C11.924,9.487 11.934,9.497 11.948,9.514 C11.963,9.530 11.974,9.542 11.981,9.549 C11.988,9.556 11.998,9.568 12.010,9.585 C12.022,9.602 12.030,9.614 12.035,9.624 L12.053,9.659 C12.053,9.659 12.058,9.673 12.068,9.702 C12.077,9.730 12.078,9.745 12.071,9.748 C12.064,9.750 12.062,9.766 12.064,9.794 C12.050,9.860 12.018,9.912 11.970,9.950 C11.921,9.988 11.868,10.005 11.810,10.000 C11.568,9.967 11.360,9.929 11.186,9.887 C10.441,9.697 9.769,9.394 9.169,8.977 C8.734,9.053 8.309,9.091 7.893,9.091 C6.582,9.091 5.441,8.778 4.469,8.153 C4.749,8.172 4.962,8.182 5.107,8.182 C5.886,8.182 6.633,8.075 7.349,7.862 C8.064,7.649 8.703,7.343 9.264,6.946 C9.868,6.510 10.333,6.008 10.657,5.440 C10.981,4.872 11.143,4.271 11.143,3.637 C11.143,3.272 11.087,2.912 10.976,2.557 C11.600,2.893 12.093,3.315 12.456,3.821 C12.818,4.328 13.000,4.872 13.000,5.455 C13.000,6.023 12.828,6.554 12.485,7.049 ZM7.672,6.787 C6.886,7.111 6.031,7.273 5.107,7.272 C4.691,7.272 4.266,7.235 3.830,7.159 C3.231,7.575 2.558,7.879 1.814,8.068 C1.640,8.111 1.432,8.148 1.190,8.182 L1.168,8.182 C1.115,8.182 1.065,8.163 1.019,8.125 C0.973,8.087 0.946,8.037 0.936,7.976 C0.931,7.962 0.929,7.946 0.929,7.930 C0.929,7.914 0.930,7.898 0.932,7.884 C0.935,7.869 0.939,7.855 0.947,7.841 L0.965,7.805 C0.965,7.805 0.973,7.792 0.990,7.767 C1.007,7.740 1.017,7.729 1.019,7.731 C1.022,7.734 1.033,7.722 1.052,7.696 C1.071,7.670 1.081,7.659 1.081,7.664 C1.105,7.636 1.161,7.577 1.248,7.486 C1.335,7.396 1.398,7.326 1.436,7.277 C1.475,7.227 1.530,7.158 1.600,7.071 C1.670,6.983 1.730,6.892 1.781,6.797 C1.832,6.703 1.881,6.598 1.930,6.485 C1.330,6.144 0.859,5.725 0.515,5.228 C0.172,4.731 0.000,4.200 0.000,3.637 C0.000,2.978 0.227,2.370 0.682,1.812 C1.137,1.253 1.757,0.812 2.543,0.487 C3.329,0.163 4.183,0.000 5.107,0.000 C6.031,0.000 6.886,0.162 7.672,0.487 C8.458,0.812 9.078,1.253 9.532,1.812 C9.987,2.370 10.214,2.978 10.214,3.637 C10.214,4.295 9.987,4.903 9.532,5.462 C9.078,6.020 8.458,6.462 7.672,6.787 ZM8.716,2.280 C8.337,1.859 7.825,1.525 7.182,1.279 C6.539,1.033 5.847,0.910 5.107,0.910 C4.367,0.910 3.676,1.033 3.032,1.279 C2.389,1.525 1.878,1.859 1.498,2.280 C1.119,2.702 0.929,3.154 0.929,3.637 C0.929,4.025 1.057,4.399 1.313,4.759 C1.569,5.119 1.930,5.431 2.394,5.697 L3.098,6.094 L2.844,6.691 C3.008,6.596 3.158,6.503 3.294,6.414 L3.613,6.194 L3.997,6.264 C4.375,6.331 4.745,6.364 5.107,6.364 C5.847,6.364 6.539,6.240 7.182,5.994 C7.825,5.748 8.337,5.415 8.716,4.993 C9.096,4.572 9.286,4.120 9.286,3.637 C9.286,3.154 9.096,2.702 8.716,2.280 Z"/></svg>${post.likes}</span></li> 
            </ul> 
            <p class="m-1">${content}</p>
            <a href="./single_page.html?${post._id}" class="blog_readmore">read more <svg xmlns="http://www.w3.org/2000/svg" width="13px" height="6px"><path fill-rule="evenodd" fill="rgb(255, 54, 87)" d="M12.924,2.786 L10.035,0.042 C9.955,-0.026 9.867,-0.039 9.772,0.003 C9.677,0.045 9.629,0.120 9.629,0.230 L9.629,1.986 L0.242,1.986 C0.172,1.986 0.114,2.010 0.069,2.057 C0.024,2.104 0.001,2.164 0.001,2.237 L0.001,3.743 C0.001,3.816 0.024,3.876 0.069,3.923 C0.114,3.970 0.172,3.994 0.242,3.994 L9.629,3.994 L9.629,5.750 C9.629,5.854 9.677,5.930 9.772,5.977 C9.867,6.019 9.955,6.003 10.035,5.930 L12.924,3.154 C12.974,3.102 12.999,3.039 12.999,2.966 C12.999,2.899 12.974,2.839 12.924,2.786 Z"></path></svg></a>
        </div>
    </div>
    
    <div class="post-control">
        <div class="text-primary">
            <i class="fas fa-edit editBtn" post_id="${post._id}" post_content="${post.content}"
            post_index="${i}" aria-hidden="true" data-toggle="modal" data-target="#editPostModal">
            </i>
        </div>
        <div class="text-danger">
            <i class="fa fa-trash delBtn" post_id="${post._id}" 
            post_index="${i}" aria-hidden="true">
            </i>
        </div>
    </div>

        `
        
        
    }
    postsList.innerHTML = temp;
    if (posts.length == 0) {
        notApprovedPosts.innerHTML = `<div>Add Some Posts</div>`;

    }

}

// Display Not Approved Posts
function displayNotApprovedPosts(posts) {
    let temp = '';
    let content
    for(const[i, post] of posts.entries()) {
        if (post.content.length > 100) {

            content = post.content.substring(1, 100)            
        }
        else {
            content = post.content
        }
        
        temp+=`<div class="blog_post_style2">
        <div class="blog_post_style2_img">
            <img src="${post.img}" class="img-fluid" alt="">
        </div>
        <div class="blog_post_style2_content">
            <h3><a href="blog_single_with_sidebar.html">${post.title}</a></h3>
            <div class="blog_author_data">
            <a href="#">
            <img src="${post.createdby.img}" class="img-fluid" alt="" width="34" height="34">${post.createdby.name}</a></div> 
            <ul class="blog_meta_tags">
                <li>
                <span class="blog_bg_blue"><svg xmlns="http://www.w3.org/2000/svg" width="12px" height="7px"><path fill-rule="evenodd"  fill="rgb(255, 255, 255)" d="M11.829,3.074 C11.732,2.948 9.422,-0.000 6.468,-0.000 C3.514,-0.000 1.203,2.948 1.106,3.074 C0.916,3.320 0.916,3.678 1.106,3.925 C1.203,4.050 3.514,6.999 6.468,6.999 C9.422,6.999 11.732,4.050 11.829,3.925 C12.020,3.678 12.020,3.320 11.829,3.074 ZM7.370,1.771 C7.569,1.651 7.846,1.788 7.989,2.077 C8.132,2.366 8.087,2.696 7.888,2.816 C7.689,2.936 7.412,2.799 7.269,2.510 C7.126,2.221 7.171,1.890 7.370,1.771 ZM6.468,5.930 C4.404,5.930 2.668,4.183 2.067,3.499 C2.473,3.037 3.397,2.091 4.589,1.525 C4.357,1.915 4.220,2.381 4.220,2.883 C4.220,4.251 5.227,5.360 6.468,5.360 C7.709,5.360 8.715,4.251 8.715,2.883 C8.715,2.381 8.579,1.915 8.346,1.525 C9.539,2.091 10.463,3.037 10.869,3.499 C10.268,4.184 8.531,5.930 6.468,5.930 Z"/></svg> ${post.views}</span></li> 
                <li><span class="blog_bg_pink"><svg xmlns="http://www.w3.org/2000/svg" width="13px" height="10px"><path fill-rule="evenodd"  fill="rgb(255, 255, 255)" d="M12.485,7.049 C12.142,7.544 11.670,7.962 11.070,8.303 C11.119,8.417 11.168,8.520 11.219,8.615 C11.270,8.710 11.330,8.801 11.401,8.889 C11.471,8.977 11.525,9.045 11.564,9.095 C11.603,9.145 11.665,9.214 11.752,9.305 C11.840,9.394 11.895,9.453 11.919,9.482 C11.924,9.487 11.934,9.497 11.948,9.514 C11.963,9.530 11.974,9.542 11.981,9.549 C11.988,9.556 11.998,9.568 12.010,9.585 C12.022,9.602 12.030,9.614 12.035,9.624 L12.053,9.659 C12.053,9.659 12.058,9.673 12.068,9.702 C12.077,9.730 12.078,9.745 12.071,9.748 C12.064,9.750 12.062,9.766 12.064,9.794 C12.050,9.860 12.018,9.912 11.970,9.950 C11.921,9.988 11.868,10.005 11.810,10.000 C11.568,9.967 11.360,9.929 11.186,9.887 C10.441,9.697 9.769,9.394 9.169,8.977 C8.734,9.053 8.309,9.091 7.893,9.091 C6.582,9.091 5.441,8.778 4.469,8.153 C4.749,8.172 4.962,8.182 5.107,8.182 C5.886,8.182 6.633,8.075 7.349,7.862 C8.064,7.649 8.703,7.343 9.264,6.946 C9.868,6.510 10.333,6.008 10.657,5.440 C10.981,4.872 11.143,4.271 11.143,3.637 C11.143,3.272 11.087,2.912 10.976,2.557 C11.600,2.893 12.093,3.315 12.456,3.821 C12.818,4.328 13.000,4.872 13.000,5.455 C13.000,6.023 12.828,6.554 12.485,7.049 ZM7.672,6.787 C6.886,7.111 6.031,7.273 5.107,7.272 C4.691,7.272 4.266,7.235 3.830,7.159 C3.231,7.575 2.558,7.879 1.814,8.068 C1.640,8.111 1.432,8.148 1.190,8.182 L1.168,8.182 C1.115,8.182 1.065,8.163 1.019,8.125 C0.973,8.087 0.946,8.037 0.936,7.976 C0.931,7.962 0.929,7.946 0.929,7.930 C0.929,7.914 0.930,7.898 0.932,7.884 C0.935,7.869 0.939,7.855 0.947,7.841 L0.965,7.805 C0.965,7.805 0.973,7.792 0.990,7.767 C1.007,7.740 1.017,7.729 1.019,7.731 C1.022,7.734 1.033,7.722 1.052,7.696 C1.071,7.670 1.081,7.659 1.081,7.664 C1.105,7.636 1.161,7.577 1.248,7.486 C1.335,7.396 1.398,7.326 1.436,7.277 C1.475,7.227 1.530,7.158 1.600,7.071 C1.670,6.983 1.730,6.892 1.781,6.797 C1.832,6.703 1.881,6.598 1.930,6.485 C1.330,6.144 0.859,5.725 0.515,5.228 C0.172,4.731 0.000,4.200 0.000,3.637 C0.000,2.978 0.227,2.370 0.682,1.812 C1.137,1.253 1.757,0.812 2.543,0.487 C3.329,0.163 4.183,0.000 5.107,0.000 C6.031,0.000 6.886,0.162 7.672,0.487 C8.458,0.812 9.078,1.253 9.532,1.812 C9.987,2.370 10.214,2.978 10.214,3.637 C10.214,4.295 9.987,4.903 9.532,5.462 C9.078,6.020 8.458,6.462 7.672,6.787 ZM8.716,2.280 C8.337,1.859 7.825,1.525 7.182,1.279 C6.539,1.033 5.847,0.910 5.107,0.910 C4.367,0.910 3.676,1.033 3.032,1.279 C2.389,1.525 1.878,1.859 1.498,2.280 C1.119,2.702 0.929,3.154 0.929,3.637 C0.929,4.025 1.057,4.399 1.313,4.759 C1.569,5.119 1.930,5.431 2.394,5.697 L3.098,6.094 L2.844,6.691 C3.008,6.596 3.158,6.503 3.294,6.414 L3.613,6.194 L3.997,6.264 C4.375,6.331 4.745,6.364 5.107,6.364 C5.847,6.364 6.539,6.240 7.182,5.994 C7.825,5.748 8.337,5.415 8.716,4.993 C9.096,4.572 9.286,4.120 9.286,3.637 C9.286,3.154 9.096,2.702 8.716,2.280 Z"/></svg>${post.likes}</span></li> 
            </ul> 
            <p class="m-1">${content}</p>
            <a href="./single_page.html?${post._id}" class="blog_readmore">read more <svg xmlns="http://www.w3.org/2000/svg" width="13px" height="6px"><path fill-rule="evenodd" fill="rgb(255, 54, 87)" d="M12.924,2.786 L10.035,0.042 C9.955,-0.026 9.867,-0.039 9.772,0.003 C9.677,0.045 9.629,0.120 9.629,0.230 L9.629,1.986 L0.242,1.986 C0.172,1.986 0.114,2.010 0.069,2.057 C0.024,2.104 0.001,2.164 0.001,2.237 L0.001,3.743 C0.001,3.816 0.024,3.876 0.069,3.923 C0.114,3.970 0.172,3.994 0.242,3.994 L9.629,3.994 L9.629,5.750 C9.629,5.854 9.677,5.930 9.772,5.977 C9.867,6.019 9.955,6.003 10.035,5.930 L12.924,3.154 C12.974,3.102 12.999,3.039 12.999,2.966 C12.999,2.899 12.974,2.839 12.924,2.786 Z"></path></svg></a>
        </div>
    </div>
    
    <div class="post-control">
        <div class="text-primary">
            <i class="far fa-check-circle fa-2x approvedBtn" post_id="${post._id}"
            post_index="${i}" aria-hidden="true">
            </i>
        </div>
        <div class="text-info">
            <i class="fas fa-edit fa-2x editBtn" post_id="${post._id}" post_content="${post}" 
            post_index="${i}" aria-hidden="true">
            </i>
        </div>
        <div class="text-danger">
            <i class="fa fa-trash fa-2x delBtn" post_id="${post._id}" 
            post_index="${i}" aria-hidden="true">
            </i>
        </div>
    </div>`
        
    }
    notApprovedPosts.innerHTML = temp;
    if (posts.length == 0) {
        notApprovedPosts.innerHTML = `<div class="text-center">All Posts Are Approved</div>`;

    }

}

// Display All Users
function displayAllUsers(users) {
    let temp = '';
    for(const[i, user] of users.entries()) {
        
        temp+=`<tr class="user-tr">
            <td scope="row">${user.name}</td>
            <td>
                <a href="./user_profile.html?${user._id}" class="btn btn-success" id="userProfile">Profile</a>
                <a href="./user_posts.html?${user._id}" class="btn btn-primary" id="userPosts">Posts</a>
                <div class="text-danger"><i class="fa fa-trash delBtn"  user_id="${user._id}"  user_index="${i}" aria-hidden="true"></i></div>
                <a href="mailto:${user.email}" class="btn" id="userMassage"> <i class="fa fa-envelope" aria-hidden="true"></i></a>

            </td>
        </tr>
        `   
    }
    
    const userTable = document.getElementById('userTable').innerHTML = temp; 
}

// Display All Admins
function displayAllAdmins(admins) {
    let temp = '';
    for(const[i, admin] of admins.entries()) {
        
        temp+=`<tr class="user-tr">
            <td scope="row">${admin.name}</td>
            <td>
                <a href="./user_profile.html?${admin._id}" class="btn btn-success" id="userProfile">Profile</a>
                <a href="./user_posts.html?${admin._id}" class="btn btn-primary" id="userPosts">Posts</a>
                <div class="text-danger"><i class="fa fa-trash delBtn"  user_id="${admin._id}"  user_index="${i}" aria-hidden="true"></i></div>
                <a href="mailto:${admin.email}" class="btn" id="userMassage"> <i class="fa fa-envelope" aria-hidden="true"></i></a>

            </td>
        </tr>
        `   
    }
    
        const adminTable = document.getElementById('adminTable').innerHTML = temp;

    
        
   
}


// Display Profile Data 
function displayUserData(data) {

    let temp = `<div class="row">
    <div class="col-md-3 d-flex"> 
        <div class="user-profile-pic">
            <img src="${data.img}" alt="" class="img-fluid">
        </div>
        <div class="col-md-9">
            <div class="user-name">
                <h3><a href="#">${data.name}</a></h3>
            </div>
            
            <div class="user-address">
                <p><i class=" icon_pin_alt"></i>${data.email}</p>
            </div>
            <div class="read-more">
            <a href="./user_profile.html?${data._id}"" class="btn btn-primary border-radius">See Posts <i class="arrow_right"></i></a>
            </div>
        </div> 
    </div>
</div>

`
         
profileInfo.innerHTML = temp;
    
}

// Display subCategories
function displaySubCategories(categories) {
    let temp = '';
    let content;
    
    for(const category of categories) {
        temp+=`<h2>${category.name}</h2>`


        for(const[j, post] of category.post.entries()) {

            if (post.content.length > 100) {

                content = post.content.substring(1, 100)            
            }


        temp+=`
        <div class="blog_post_style2">
        <div class="blog_post_style2_img">
            <img src="${post.img}" class="img-fluid" alt="">
        </div>
        <div class="blog_post_style2_content">
            <h3><a href="blog_single_with_sidebar.html">${post.title}</a></h3>
            <div class="blog_author_data">
            <a href="#">
            <img src="${post.createdby.img}" 
            class="img-fluid" alt="" width="34" height="34">${post.createdby.name}</a></div> 
            <ul class="blog_meta_tags">
                <li>
                <span class="blog_bg_blue"><svg xmlns="http://www.w3.org/2000/svg" width="12px" height="7px"><path fill-rule="evenodd"  fill="rgb(255, 255, 255)" d="M11.829,3.074 C11.732,2.948 9.422,-0.000 6.468,-0.000 C3.514,-0.000 1.203,2.948 1.106,3.074 C0.916,3.320 0.916,3.678 1.106,3.925 C1.203,4.050 3.514,6.999 6.468,6.999 C9.422,6.999 11.732,4.050 11.829,3.925 C12.020,3.678 12.020,3.320 11.829,3.074 ZM7.370,1.771 C7.569,1.651 7.846,1.788 7.989,2.077 C8.132,2.366 8.087,2.696 7.888,2.816 C7.689,2.936 7.412,2.799 7.269,2.510 C7.126,2.221 7.171,1.890 7.370,1.771 ZM6.468,5.930 C4.404,5.930 2.668,4.183 2.067,3.499 C2.473,3.037 3.397,2.091 4.589,1.525 C4.357,1.915 4.220,2.381 4.220,2.883 C4.220,4.251 5.227,5.360 6.468,5.360 C7.709,5.360 8.715,4.251 8.715,2.883 C8.715,2.381 8.579,1.915 8.346,1.525 C9.539,2.091 10.463,3.037 10.869,3.499 C10.268,4.184 8.531,5.930 6.468,5.930 Z"/></svg> ${post.views}</span></li> 
                <li><span class="blog_bg_pink"><svg xmlns="http://www.w3.org/2000/svg" width="13px" height="10px"><path fill-rule="evenodd"  fill="rgb(255, 255, 255)" d="M12.485,7.049 C12.142,7.544 11.670,7.962 11.070,8.303 C11.119,8.417 11.168,8.520 11.219,8.615 C11.270,8.710 11.330,8.801 11.401,8.889 C11.471,8.977 11.525,9.045 11.564,9.095 C11.603,9.145 11.665,9.214 11.752,9.305 C11.840,9.394 11.895,9.453 11.919,9.482 C11.924,9.487 11.934,9.497 11.948,9.514 C11.963,9.530 11.974,9.542 11.981,9.549 C11.988,9.556 11.998,9.568 12.010,9.585 C12.022,9.602 12.030,9.614 12.035,9.624 L12.053,9.659 C12.053,9.659 12.058,9.673 12.068,9.702 C12.077,9.730 12.078,9.745 12.071,9.748 C12.064,9.750 12.062,9.766 12.064,9.794 C12.050,9.860 12.018,9.912 11.970,9.950 C11.921,9.988 11.868,10.005 11.810,10.000 C11.568,9.967 11.360,9.929 11.186,9.887 C10.441,9.697 9.769,9.394 9.169,8.977 C8.734,9.053 8.309,9.091 7.893,9.091 C6.582,9.091 5.441,8.778 4.469,8.153 C4.749,8.172 4.962,8.182 5.107,8.182 C5.886,8.182 6.633,8.075 7.349,7.862 C8.064,7.649 8.703,7.343 9.264,6.946 C9.868,6.510 10.333,6.008 10.657,5.440 C10.981,4.872 11.143,4.271 11.143,3.637 C11.143,3.272 11.087,2.912 10.976,2.557 C11.600,2.893 12.093,3.315 12.456,3.821 C12.818,4.328 13.000,4.872 13.000,5.455 C13.000,6.023 12.828,6.554 12.485,7.049 ZM7.672,6.787 C6.886,7.111 6.031,7.273 5.107,7.272 C4.691,7.272 4.266,7.235 3.830,7.159 C3.231,7.575 2.558,7.879 1.814,8.068 C1.640,8.111 1.432,8.148 1.190,8.182 L1.168,8.182 C1.115,8.182 1.065,8.163 1.019,8.125 C0.973,8.087 0.946,8.037 0.936,7.976 C0.931,7.962 0.929,7.946 0.929,7.930 C0.929,7.914 0.930,7.898 0.932,7.884 C0.935,7.869 0.939,7.855 0.947,7.841 L0.965,7.805 C0.965,7.805 0.973,7.792 0.990,7.767 C1.007,7.740 1.017,7.729 1.019,7.731 C1.022,7.734 1.033,7.722 1.052,7.696 C1.071,7.670 1.081,7.659 1.081,7.664 C1.105,7.636 1.161,7.577 1.248,7.486 C1.335,7.396 1.398,7.326 1.436,7.277 C1.475,7.227 1.530,7.158 1.600,7.071 C1.670,6.983 1.730,6.892 1.781,6.797 C1.832,6.703 1.881,6.598 1.930,6.485 C1.330,6.144 0.859,5.725 0.515,5.228 C0.172,4.731 0.000,4.200 0.000,3.637 C0.000,2.978 0.227,2.370 0.682,1.812 C1.137,1.253 1.757,0.812 2.543,0.487 C3.329,0.163 4.183,0.000 5.107,0.000 C6.031,0.000 6.886,0.162 7.672,0.487 C8.458,0.812 9.078,1.253 9.532,1.812 C9.987,2.370 10.214,2.978 10.214,3.637 C10.214,4.295 9.987,4.903 9.532,5.462 C9.078,6.020 8.458,6.462 7.672,6.787 ZM8.716,2.280 C8.337,1.859 7.825,1.525 7.182,1.279 C6.539,1.033 5.847,0.910 5.107,0.910 C4.367,0.910 3.676,1.033 3.032,1.279 C2.389,1.525 1.878,1.859 1.498,2.280 C1.119,2.702 0.929,3.154 0.929,3.637 C0.929,4.025 1.057,4.399 1.313,4.759 C1.569,5.119 1.930,5.431 2.394,5.697 L3.098,6.094 L2.844,6.691 C3.008,6.596 3.158,6.503 3.294,6.414 L3.613,6.194 L3.997,6.264 C4.375,6.331 4.745,6.364 5.107,6.364 C5.847,6.364 6.539,6.240 7.182,5.994 C7.825,5.748 8.337,5.415 8.716,4.993 C9.096,4.572 9.286,4.120 9.286,3.637 C9.286,3.154 9.096,2.702 8.716,2.280 Z"/></svg>${post.likes}</span></li> 
            </ul> 
            <p class="m-1">${content}</p>
            <a href="./single_page.html?${post._id}" class="blog_readmore">read more <svg xmlns="http://www.w3.org/2000/svg" width="13px" height="6px"><path fill-rule="evenodd" fill="rgb(255, 54, 87)" d="M12.924,2.786 L10.035,0.042 C9.955,-0.026 9.867,-0.039 9.772,0.003 C9.677,0.045 9.629,0.120 9.629,0.230 L9.629,1.986 L0.242,1.986 C0.172,1.986 0.114,2.010 0.069,2.057 C0.024,2.104 0.001,2.164 0.001,2.237 L0.001,3.743 C0.001,3.816 0.024,3.876 0.069,3.923 C0.114,3.970 0.172,3.994 0.242,3.994 L9.629,3.994 L9.629,5.750 C9.629,5.854 9.677,5.930 9.772,5.977 C9.867,6.019 9.955,6.003 10.035,5.930 L12.924,3.154 C12.974,3.102 12.999,3.039 12.999,2.966 C12.999,2.899 12.974,2.839 12.924,2.786 Z"></path></svg></a>
        </div>
    </div>
    
    <div class="post-control">
        <div class="text-primary">
            <i class="fas fa-edit editBtn" post_id="${post._id} post_content="${post}"
            post_index="${j}" aria-hidden="true" data-toggle="modal" data-target="#editPostModal">
            </i>
        </div>
        <div class="text-danger">
            <i class="fa fa-trash delBtn" post_id="${post._id}" 
            post_index="${j}" aria-hidden="true">
            </i>
        </div>
    </div>

        `
    }
        
    }
    categoriesList.innerHTML = temp;
    if (categories.length == 0) {
        categoriesList.innerHTML = `<div>Add Some sub categories</div>`;

    }

}

// Add Sub category
// function subCategory() {
//     const addSubCateForm = document.getElementById('addSubCateForm');
//     // addSubBtn.addEventListener('click', (e) => {
//     //     e.preventDefault();

//     // })

// }

(function($) {

    "use strict";

    var assect_cookie = 0;
    var blog = {
        initialised: false,
        version: 1.0,
        mobile: false,
        init: function() {
            if (!this.initialised) {
                this.initialised = true;
            } else {
                return;
            }
            /*-------------- Blog Functions Calling ---------------------------------------------------
            ------------------------------------------------------------------------------------------------*/
            this.Menu();
          
            this.UserProfile();          
            this.NavToggleOpen();
            this.wow();
        },
        /*-------------- Blog Functions definition ---------------------------------------------------
        ---------------------------------------------------------------------------------------------------*/
        // Toggle Menu
        /*menu toggle*/
        Menu: function() {
            var wh = window.innerWidth;
            // //Go to top
            if (wh < 991) {
                $('.blog_menu_toggle').on('click', function(e) {

                    if ($('.blog_main_menu_innerdiv li.active').length) {
                        $('.blog_main_menu_innerdiv li.active .sub-menu').hide();
                        $('.blog_main_menu_innerdiv li.active').removeClass('active');
                    }


                    $(".blog_main_menu ").slideToggle("slow");
                });

                $(document).on('click', ".blog_main_menu_innerdiv ul li.blog_dropdown", function(e) {
                    $('.blog_main_menu_innerdiv ul li.dd_open').not($(this)).removeClass('dd_open').find("ul.sub-menu").slideUp();
                    $(this).addClass('dd_open').find('.sub-menu').slideToggle();
                });
            }
            $(".blog_main_menu_innerdiv ul li ul.sub-menu").parent("li").addClass("blog_dropdown");
        },

        UserProfile: function() {
            $(document).on("click", '.blog_user_div a', function() {
                $(this).closest('.blog_user_div').toggleClass("profile_open");
            });

            $('.blog_user_div').html('<div class="blogUserWrapper">' + $('.blog_user_div').html() + '</div>');

            $(document).on('click', function(e) {
                if (!$(e.target).closest('.blogUserWrapper').length) {
                    $('.blog_user_div').removeClass("profile_open");
                }
            });
        },


        NavToggleOpen: function() {
            $(".tab_toggle_menu a").on("click", function() {

                $('.nav-tabs').not($(this).closest('.blog_topheading_slider_nav').find('.nav-tabs')).removeClass('nav_toggle_open');
                $(this).closest('.blog_topheading_slider_nav').find('.nav-tabs').toggleClass('nav_toggle_open');
            });

        },
   
        wow: function() {
            new WOW().init();
        }
    };
    $(document).ready(function() {
        blog.init();

    });
    // Preloader Js
    jQuery(window).on('load', function() {
        jQuery("#blog_preloader_box").fadeOut();
        jQuery("#blog_preloader_wrapper").delay(350).fadeOut("slow");
    });
    // Window Scroll
    $(window).scroll(function() {
        var wh = window.innerWidth;
        // //Go to top
        if (assect_cookie == 0) {
            if ($(this).scrollTop() > 100) {
                $(".blog_cookies_div").show();
            } else {
                $(".blog_cookies_div").hide();
            }
        }


    });



})(jQuery);