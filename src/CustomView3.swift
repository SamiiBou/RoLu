//
//  CustomView3.swift
//
//  Created by codia-figma
//

import SwiftUI

struct CustomView3: View {
    @State public var image1Path: String = "image1_362620"
    @State public var image2Path: String = "image2_362624"
    @State public var image3Path: String = "image3_362628"
    @State public var text3Text: String = "9:41"
    var body: some View {
        ZStack(alignment: .topLeading) {
            Rectangle()
                .fill(Color.clear)
            Image(image1Path)
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(width: 24.328, height: 11.333, alignment: .topLeading)
                .offset(x: 410, y: 17.333)
            Image(image2Path)
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(width: 17.811, height: 10.966, alignment: .topTrailing)
                .offset(x: 379.835, y: 17.331)
            Image(image3Path)
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(width: 19.826, height: 10.667, alignment: .topTrailing)
                .offset(x: 354.147, y: 17.667)
            CustomView5(text3Text: text3Text)
                .frame(width: 64.656, height: 18)
                .offset(x: 18.147, y: 14.33)
        }
        .frame(width: 449, height: 44, alignment: .topLeading)
        .clipped()
    }
}

struct CustomView3_Previews: PreviewProvider {
    static var previews: some View {
        CustomView3()
    }
}
